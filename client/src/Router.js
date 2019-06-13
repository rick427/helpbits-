import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './component/Home';
import Signup from './users/Signup';
import SignIn from './users/SignIn';
import Menu from './component/Menu';
import Profile from './users/Profile';
import Users from './users/User';
import EditProfile from './users/EditProfile';

const Router = () => {
    return (
        <>
        <Menu/>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Signup}/>
            <Route exact path="/login" component={SignIn}/>
            <Route exact path="/user/:id" component={Profile}/>
            <Route exact path="/users" component={Users}/>
            <Route exact path="/user/edit/:id" component={EditProfile}/>
        </Switch>
        </>
    )
}

export default Router;
