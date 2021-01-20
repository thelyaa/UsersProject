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
    _created: Date
}));

const EventsListModel = mongoose.model('admins', new Schema({  
    userId: Schema.Types.ObjectId,
    userName: String,
    eventId: Schema.Types.ObjectId,
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
//        console.log(result, result.length.toString()); 
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
        _created: date
    }, function(err, result){
        console.log(result);  
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
        console.log(data)
        res.send(data)
    })
})

app.post('/createEventsFunction', (req, res) => {
    console.log(req.query);
    eventsModel.create({
        _eventTitle: req.query.title,
        _startDate: req.query.startDate,
        _c1Date: req.query.c1Date,
        _cPlus1Date: req.query.cPlus1Date,
        _finishDate: req.query.finishDate,
        _participants: 0
    }, function(err, result){
        console.log(result);
        if (err) console.log(err);
    });
})

app.post('/assignUser', (req, res) => {
    console.log(req.query)
    EventsListModel.create({
        userId: req.query.userId,
        userName: req.query.userName,
        eventId: req.query.eventId,
        eventTitle: req.query.eventTitle,
        role: req.query.role,
        assign: req.query.assign
    }, function(err, result){
        console.log(result)
    });
})

//app.get('/getEventsListFunction', (req, res) => {
//    eventsModel.find({}, function(err, data){
//        console.log(data)
//        res.send(data)
//    })
//})

const PORT = 9000

app.listen(PORT, () => console.log('server started'));