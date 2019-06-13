import React, { Component } from 'react';

class Profile extends Component {
    state = {
        user: "",
        redirect: false
    }

    componentDidMount(){
        
    }

    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
            </div>
        )
    }
}

export default Profile;
