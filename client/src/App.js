import React from "react";
import axios from "axios";
import './App.css';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import UserinfoForm from './Components/UserinfoForm';
import UpdateLoginForm from './Components/UpdateLoginForm';
import UpdateProfileForm from './Components/UpdateProfileForm';
import UserPINForm from './Components/UserPINForm';
import HomeForm from './Components/HomeForm';
import UsersListForm from './Components/UsersListForm';
import EventsListForm from './Components/EventsListForm';
import CreateEventsForm from './Components/CreateEventsForm';
import EventsForm from './Components/EventsForm';
import UpdateEventInfoForm from './Components/UpdateEventInfoForm';
import DocumentsListForm from './Components/DocumentsListForm';
import CreateDocForm from './Components/CreateDocForm';
import DocsForm from './Components/DocsForm';
import UpdateDocInfoForm from './Components/UpdateDocInfoForm';

export default class App extends React.Component {
  state = {
      currentScreen: 0,
      currentLogin: "не авторизирован",
      userId: "",
      password: "",
      firstName: "",
      lastName: "",
      country: "",
      about: "",
      role: "No role",
      pin: "",
      list: [],
      usersList: [],
      eventsList: [],
      docList: [],
      eventTitle: "",
      startDate: "",
      c1Date: "",
      cPlus1Date: "",
      finishDate: "",
      eventId: "",
      docTitle: "",
      day: "",
      content: "",
      _for: "",
      docId: "",
      participants: 0,
      isPart: false
  };

//0 - главный экран (авторизация), 1 - регистрация, 2 - юзеринфо, 3 - сменить пароль (update login), 4 - редактировать профиль, 5 - пин, 6 - home page, 7 - admin все пользователи, 8 - events list, 9 - create events, 10 - events info, 11 - сменить тайтл мероприятия, 12 - список документов, 13 - create doc, 14 - doc info, 15 - doc update

    setLoginData(login, password, firstName, lastName, country, about, role, pin, userId){
        if (this.state.currentScreen === 3) this.setState({password: password, currentScreen: 2})
        else if (this.state.currentScreen === 4) 
            this.setState({currentScreen: 2, firstName: firstName, lastName: lastName, country: country, about: about});
        else
            this.setState({currentLogin: login, password: password, currentScreen: 2, firstName: firstName, lastName: lastName, country: country, about: about, role: role, pin: pin, userId: userId}) 
    }
    
    setListData(list, usersList, eventsList, docList){
        if (list.length != 0 && this.state.currentScreen === 6)
            this.setState({list: list, usersList: usersList, eventsList: eventsList, currentScreen: 7})
        else if (docList.length != 0) this.setState({docList: docList, currentScreen: 12})
        else this.setState({eventsList: eventsList, currentScreen: 8})
    }
    
    setEventInfoData(eventInfo, isPart){
        this.setState({currentScreen: 10, eventTitle: eventInfo[0].title, startDate: eventInfo[0].startDate, c1Date: eventInfo[0].c1Date, cPlus1Date: eventInfo[0].cPlus1Date, finishDate: eventInfo[0].finishDate, eventId: eventInfo[0].eventId, participants: eventInfo[0].participants, isPart: isPart})
    }
    
    setEventTitleData(eventTitle){
        this.setState({currentScreen: 10, eventTitle: eventTitle})
    }

    setDocInfoData(docInfo){
        this.setState({currentScreen: 14, docTitle: docInfo[0].docTitle, day: docInfo[0].day, content: docInfo[0].content, _for: docInfo[0].for, docId: docInfo[0].docId})
    }

    setDocInfoForUpdate(title, day, content, _for, docId){
        this.setState({currentScreen: 15, docTitle: title, day: day, content: content, _for: _for, docId: docId})
    }

    setUpdateDocData(title, day, content, _for){
        this.setState({currentScreen: 14, docTitle: title, day: day, content: content, _for: _for})
    }
    
    setPINData(pin){
        this.setState({currentScreen: 2, pin: pin})   
    }
    
    setDocInfoFromList(docId, docTitle, day, content, _for){
        this.setState({docId: docId, docTitle: docTitle, day: day, content: content, _for: _for, currentScreen: 14})
    }

  render() {
    return (
      <div>{this.state.currentLogin} {this.state.role} {this.state.currentScreen}{
        this.state.currentScreen === 0 ? (
            <LoginForm signUpHandler={()=>{this.setState({currentScreen: 1})}}
            signInHandler={this.setLoginData.bind(this)}/>
        ):""}
        {this.state.currentScreen === 1 ? (
            <RegisterForm cancelHandler={() => {this.setState({currentScreen: 0})}}
            registerHandler={this.setLoginData.bind(this)}/>
        ):""}
        {this.state.currentScreen === 2 ? (
            <UserinfoForm updateLoginHandler={() => {this.setState({currentScreen: 3})}}
            homePageHandler={() => {this.setState({currentScreen: 6})}}
            updateProfileHandler={() => {this.setState({currentScreen: 4})}}
            setPINHandler={() => {this.setState({currentScreen: 5})}}          
            currentLogin={this.state.currentLogin}
            password={this.state.password}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            country={this.state.country}
            about={this.state.about}
            pin={this.state.pin}
            userId={this.state.userId}/>
        ):""}
        {this.state.currentScreen === 3 ? (
            <UpdateLoginForm cancelHandler={() => {this.setState({currentScreen: 2})}}
            saveLoginUpdateHandler={this.setLoginData.bind(this)}
            currentLogin={this.state.currentLogin}
            password={this.state.password}
            firstName={this.state.firstName}/>    
        ):""}
        {this.state.currentScreen === 4 ? (
            <UpdateProfileForm saveProfileUpdateHandler={this.setLoginData.bind(this)}
            cancelHandler={() => {this.setState({currentScreen: 2})}}
            currentLogin={this.state.currentLogin}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            country={this.state.country}
            about={this.state.about}/>    
        ):""}
        {this.state.currentScreen === 5 ? (
            <UserPINForm savePINHandler={this.setPINData.bind(this)}
            cancelHandler={() => {this.setState({currentScreen: 2})}}
            pin={this.state.pin}
            userId={this.state.userId}/>    
        ):""}
        {this.state.currentScreen === 6 ? (
            <HomeForm browseUsersHandler={this.setListData.bind(this)}
            browseEventsHandler={this.setListData.bind(this)}
            createEventsHandler={() => {this.setState({currentScreen: 9})}}
//            eventsInfoHandler={() => {this.setState({currentScreen: 10})}}
            browseDocsHandler={this.setListData.bind(this)}
            createDocHandler={() => {this.setState({currentScreen: 13})}}
            role={this.state.role}/>
        ):""}
        {this.state.currentScreen === 7 ? (
            <UsersListForm 
            list={this.state.list}
            usersList={this.state.usersList}
            eventsList={this.state.eventsList}
            handlerAssign={() => {this.setState({currentScreen: 6})}}/>
        ):""}
        {this.state.currentScreen === 8 ? (
            <EventsListForm eventsList={this.state.eventsList}
            addEventHandler={() => {this.setState({currentScreen: 9})}}
            role={this.state.role}
            goToEventInfo={this.setEventInfoData.bind(this)}
            userId={this.state.userId}
            cancelHandler={() => {this.setState({currentScreen: 6})}}/>
        ):""}
        {this.state.currentScreen === 9 ? (
            <CreateEventsForm createEventHandler={this.setEventInfoData.bind(this)}
            cancelHandler={() => {this.setState({currentScreen: 6})}}/>
        ):""}
        {this.state.currentScreen === 10 ? (
            <EventsForm updateEventInfoHandler={() => {this.setState({currentScreen: 11})}}
            eventTitle={this.state.eventTitle}
            startDate={this.state.startDate}
            c1Date={this.state.c1Date}
            cPlus1Date={this.state.cPlus1Date}
            finishDate={this.state.finishDate}
            eventId={this.state.eventId}
            participants={this.state.participants}
            role={this.state.role}
            cancelHandler={() => {this.setState({currentScreen: 8})}}
            isPart={this.state.isPart}/>
        ):""}
        {this.state.currentScreen === 11 ? (
            <UpdateEventInfoForm 
            eventTitle={this.state.eventTitle}
            eventId={this.state.eventId}
            updateEventTitleHandler={this.setEventTitleData.bind(this)}
            cancelHandler={() => {this.setState({currentScreen: 10})}}/>
        ):""}
        {this.state.currentScreen === 12 ? (
            <DocumentsListForm docList={this.state.docList}
            addDocumentHandler={() => {this.setState({currentScreen: 13})}}
            role={this.state.role}
            goToDocInfoHandler={this.setDocInfoFromList.bind(this)}/>
        ):""}
        {this.state.currentScreen === 13 ? (
            <CreateDocForm createDocHandler={this.setDocInfoData.bind(this)}
            cancelHandler={() => {this.setState({currentScreen: 6})}}/>
        ):""}
        {this.state.currentScreen === 14 ? (
            <DocsForm 
            docTitle={this.state.docTitle}
            day={this.state.day}
            content={this.state.content}
            _for={this.state._for}
            docId={this.state.docId}
            role={this.state.role}
            updateDocInfoHandler={this.setDocInfoForUpdate.bind(this)}
            cancelHandler={() => {this.setState({currentScreen: 6})}}/>
        ):""}
        {this.state.currentScreen === 15 ? (
            <UpdateDocInfoForm
            docTitle={this.state.docTitle}
            docId={this.state.docId}
            day={this.state.day}
            content={this.state.content}
            _for={this.state._for}
            cancelHandler={() => {this.setState({currentScreen: 14})}}
            updateDocHandler={this.setUpdateDocData.bind(this)}/>
        ):""}
      </div>
    );
  }
}
