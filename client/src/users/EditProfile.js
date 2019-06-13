import React, { Component } from 'react';
import {isAuthenticated, profileRequest} from '../context';

class EditProfile extends Component {
    state = {
      id: '',
      name: '',
      email: '',
      password: ''
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.initialize(id);
    }

    initialize = (id) => {
        const {token} = isAuthenticated();
        profileRequest(id, token)
        .then(data => {
            if(data.error) {
                this.setState({redirect: true})
            }
            else {
                this.setState({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    password: data.password
                })
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>
            </div>
        )
    }
}

export default EditProfile;
