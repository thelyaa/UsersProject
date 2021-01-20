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

export default class App extends React.Component {
  state = {
      currentScreen: 0,
      currentLogin: "не авторизирован",
      password: "",
      firstName: "",
      lastName: "",
      country: "",
      about: "",
      role: "No role",
      list: [],
      usersList: [],
      eventsList: [],
      eventTitle: "",
      startDate: "",
      c1Date: "",
      cPlus1Date: "",
      finishDate: "",
      eventId: ""
  };

//0 - главный экран (авторизация), 1 - регистрация, 2 - юзеринфо, 3 - сменить пароль (update login), 4 - редактировать профиль, 5 - пин, 6 - home page, 7 - admin все пользователи, 8 - events list, 9 - create events, 10 - events info, 11 - сменить тайтл мероприятия

    setLoginData(login, password, firstName, lastName, country, about){
        if (this.state.currentScreen === 3) this.setState({password: password, currentScreen: 2})
        else if (this.state.currentScreen === 4) 
            this.setState({currentScreen: 2, firstName: firstName, lastName: lastName, country: country, about: about});
        else
            this.setState({currentLogin: login, password: password, currentScreen: 2, firstName: firstName, lastName: lastName, country: country, about: about}) 
    }
    
    setListData(list, usersList, eventsList){
        if (list.length != 0 && this.state.currentScreen === 6)
            this.setState({list: list, usersList: usersList, eventsList: eventsList, currentScreen: 7})
        else this.setState({eventsList: eventsList, currentScreen: 8})
    }
    
    setEventInfoData(eventInfo){
        this.setState({currentScreen: 10, eventTitle: eventInfo[0].title, startDate: eventInfo[0].startDate, c1Date: eventInfo[0].c1Date, cPlus1Date: eventInfo[0].cPlus1Date, finishDate: eventInfo[0].finishDate, eventId: eventInfo[0].eventId})
        console.log(eventInfo)
    }
    
    setEventTitleData(eventTitle){
        this.setState({currentScreen: 10, eventTitle: eventTitle})
    }
  render() {
    return (
      <div>{this.state.currentLogin} {this.state.password} {this.state.currentScreen}{
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
            about={this.state.about}/>
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
            <UserPINForm savePINHandler={() => {this.setState({currentScreen: 2})}}
            cancelHandler={() => {this.setState({currentScreen: 2})}}/>    
        ):""}
        {this.state.currentScreen === 6 ? (
            <HomeForm browseUsersHandler={this.setListData.bind(this)}
            browseEventsHandler={this.setListData.bind(this)}
            createEventsHandler={() => {this.setState({currentScreen: 9})}}
            eventsInfoHandler={() => {this.setState({currentScreen: 10})}}/>
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
            addEventHandler={() => {this.setState({currentScreen: 9})}}/>
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
            eventId={this.state.eventId}/>
        ):""}
        {this.state.currentScreen === 11 ? (
            <UpdateEventInfoForm 
            eventTitle={this.state.eventTitle}
            eventId={this.state.eventId}
            updateEventTitleHandler={this.setEventTitleData.bind(this)}
            cancelHandler={() => {this.setState({currentScreen: 10})}}/>
        ):""}
      </div>
    );
  }
}
