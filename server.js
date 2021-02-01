const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

app.use(cors());

var Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://thelyaa:Fkm,tlj1@cluster0.lxn7u.mongodb.net/usersProject', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
const MyModel = mongoose.model('users', new Schema({ 
    _email: String, 
    _password: String,
    _firstName: String,
    _lastName: String,
    _country: String,
    _repeatPassword: String,
    _about: String,
    _role: String,
    _created: Date,
    _pin: String
}));

const EventsListModel = mongoose.model('admins', new Schema({  
    userId: String,
    userName: String,
    eventId: String,
    eventTitle: String,
    role: String,
    assign: String
}));

const eventsModel = mongoose.model('events', new Schema({
    _eventTitle: String,
    _startDate: Date,
    _c1Date: Date,
    _cPlus1Date: Date,
    _finishDate: Date,
    _participants: Number
}));

const docModel = mongoose.model('documents', new Schema({
    _eventId: String,
    _day: String,
    _for: String,
    _docTitle: String,
    _content: String,
    _signed: String
}));
//app.get('/', (req, res) => {
//    console.log("worked");    
//    var role = 0;
//    res.send({role});
//    console.log(role);
//    
//    
////    MyModel.find({}, function(err, result) { console.log(err, result); });
//})

app.post('/signInFunction', (req, res) => {
//    console.log(req.query);
    MyModel.find({
        _email: req.query.login,
        _password: req.query.password
    }, function(err, result){
//        console.log(result); 
        res.send(result);
    });  
})

var date = new Date();
app.post('/registerNewUserFunction', (req, res) => {
//    console.log(req.query);
    MyModel.create({
        _firstName: req.query.firstName,
        _lastName: req.query.lastName,
        _country: req.query.country,
        _email: req.query.email,
        _password: req.query.password,
        _repeatPassword: req.query.repeatPassword,
        _role: "No role",
        _created: date,
        _pin: ""
    }, function(err, result){
        console.log(result);  
        res.send(result)
        if (err) console.log(err);
    });
})

app.post('/updatePasswordFunction', (req, res) => {
    console.log("sdgs");
//    console.log(req.query);
    MyModel.updateOne({_email: req.query.email}, {_password: req.query.password}, function(err, result){
        if (err) console.log(err);
        res.send("успешно");
    });
})

app.post('/saveProfileUpdateFunction', (req, res) => {
//    console.log(req.query);
    MyModel.updateOne({_email: req.query.email}, {_firstName: req.query.firstName, _lastName: req.query.lastName, _country: req.query.country, _about: req.query.about}, function(err, result){
        if (err) console.log(err);
        res.send("успешно");
    });
})

app.get('/getAdminListFunction', (req, res) => {
    EventsListModel.find({}, function(err, result){
//        MyModel.find({}, function(err, data){
//            console.log(result)
            res.send(result)
//        });
    });
})

app.get('/getUsers', (req, res) =>{
    MyModel.find({}, function(err, data){
        //console.log(data[0])
        res.send(data)
    })
})

app.get('/getEvents', (req, res) =>{
    eventsModel.find({}, function(err, data){
//        console.log(data)
        res.send(data)
    })
})

app.post('/createEventsFunction', (req, res) => {
    //console.log(req.query);
    eventsModel.create({
        _eventTitle: req.query.title,
        _startDate: req.query.startDate,
        _c1Date: req.query.c1Date,
        _cPlus1Date: req.query.cPlus1Date,
        _finishDate: req.query.finishDate,
        _participants: 0
    }, function(err, result){
        console.log("id", result._id);
        if (err) console.log(err)
        res.send(result._id);
    });
})

app.post('/assignUser', (req, res) => {
//    console.log(req.query)
    EventsListModel.create({
        userId: req.query.userId,
        userName: req.query.userName,
        eventId: req.query.eventId,
        eventTitle: req.query.eventTitle,
        role: req.query.role,
        assign: req.query.assign
    }, function(err, result){
//        console.log(result)
        eventsModel.find({_id: req.query.eventId}, function(err, data){
            console.log("bla", data[0]._participants + 1)
            var part = data[0]._participants + 1
            eventsModel.updateOne({_id: req.query.eventId}, {_participants: part}, 
            function(err, rslt){  
                 res.send("success")
             })
       });
    })
})

app.post('/updateEventTitleFunction', (req, res) => {
    console.log("dbdd", req.query)
    eventsModel.updateOne({_id: mongoose.Types.ObjectId(req.query.eventId)}, {_eventTitle: req.query.eventTitle}, function(err, result){
        EventsListModel.updateOne({eventId: mongoose.Types.ObjectId(req.query.eventId)}, {eventTitle: req.query.eventTitle}, function(error, res){
            if (error) console.log(error)
        })
        if (err) console.log(err)
        res.send("success")
    })
})

app.get('/getDocuments', (req, res) => {
    docModel.find({}, function(err, result){
//        console.log(result)
        res.send(result)
    })
})

app.post('/createDoc', (req, res) => {
    docModel.create({
        _docTitle: req.query.docTitle,
        _day: req.query.day,
        _content: req.query.content,
        _for: req.query.for,
        _signed: "none"
    }, function(err, result){
//        console.log(result)
        res.send(result._id)
    })
})

app.post('/updateDocFunction', (req, res) => {
    docModel.updateOne({_id: mongoose.Types.ObjectId(req.query.docId)}, {
        _docTitle: req.query.docTitle,
        _day: req.query.day,
        _content: req.query.content,
        _for: req.query._for
    },
    function(err, result){
//        console.log(result)
        res.send(result)
    })
})

app.post('/resetPin',(req, res) => {
    MyModel.updateOne({_id: mongoose.Types.ObjectId(req.query.userId)}, {
        _pin: ""
    }, function(err, result){
//        console.log(result)
        res.send("success")
    })
})

app.post('/savePIN', (req, res) => {
    console.log(req.query)
    MyModel.updateOne({_id: mongoose.Types.ObjectId(req.query.userId)}, {
        _pin: req.query.pin
    }, function(err, result){
        res.send("success")
    })
})

app.post('/getDocumentInfo', (req, res) => {
    docModel.find({_id: req.query.id}, function(err, result){
        res.send(result)
    })
})

app.post('/getAdminListInfo', (req, res) => {
    console.log(req.query)
    EventsListModel.find({_id: req.query.id}, function(err, result){
        EventsListModel.deleteOne({_id: req.query.id}, function(err, data){ 
            res.send(result)
        })
    })
})

app.post('/updateParticipants', (req, res) => {
    eventsModel.find({_id: req.query.eventId}, function(err, result){
        var part = result[0]._participants - 1
        eventsModel.updateOne({_id: req.query.eventId}, {_participants: part},
        function(err, data){
            res.send("success")    
        })
    })
})

app.post('/getEventInfo', (req, res) => {
    eventsModel.find({_id: req.query.id}, function(err, result){
        res.send(result[0])
    })
})

app.post('/getUserEvents', (req, res) => {
    EventsListModel.find({
        userId: mongoose.Types.ObjectId(req.query.userId),
        eventId: mongoose.Types.ObjectId(req.query.eventId)
    }, function(err, result){
        console.log(result)
        res.send(result[0])
    })
})

const PORT = 9000

app.listen(PORT, () => console.log('server started'));