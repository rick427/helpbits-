import React, { Component } from 'react';
import {isAuthenticated, profileRequest} from '../context';
import {Redirect} from 'react-router-dom';

class Profile extends Component {
    state = {
        user: "",
        redirect: false
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.initialize(id);   
    }

    // initialize the id of the user to make a request to the backend api
    initialize = (id) => {
        const {token} = isAuthenticated();
        profileRequest(id, token)
        .then(data => {
            if(data.error) {
                this.setState({redirect: true})
            }
            else {
                this.setState({user: data})
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        const {user} = isAuthenticated();
        const redirect = this.state.redirect;
        if(redirect){
            return <Redirect to="/login"/>
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
            </div>
        )
    }
}

export default Profile;
