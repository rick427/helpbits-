import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './component/Home';
import Signup from './users/Signup';
import SignIn from './users/SignIn';
import Menu from './component/Menu';
import Profile from './users/Profile';

const Router = () => {
    return (
        <>
        <Menu/>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Signup}/>
            <Route exact path="/login" component={SignIn}/>
            <Route exact path="/user/:id" component={Profile}/>
        </Switch>
        </>
    )
}

export default Router;
