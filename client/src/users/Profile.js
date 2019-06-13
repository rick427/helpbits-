import React, { Component } from 'react';
import {isAuthenticated, profileRequest} from '../context';
import {Link, Redirect} from 'react-router-dom';
import defaultImage from '../userImg2.jpg';

class Profile extends Component {
    state = {
        user: "",
        redirect: false
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.initialize(id);
        //console.log("default props",this.props);
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
       // console.log("after setstate", this.state.user)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="mt-5 mb-5 text-muted">Profile</h2>
                        <img 
                            src={defaultImage} 
                            alt="card" 
                            className="card-img-top" 
                            style={{width: "62%"}}
                        />
                    </div>

                    <div className="col-md-6 mt-3">
                        <div className="lead mt-5">
                            <p>{this.state.user.name}</p>
                            <p>{this.state.user.email}</p>
                            <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
                        </div>
                        {user && user._id === this.state.user._id &&(
                            <div className="d-inline-block">
                                <Link to={`user/edit/${this.state.user._id}`} className="btn btn-raised btn-success mr-5">
                                    Edit Profile
                                </Link>
                                <button className="btn btn-raised btn-danger">Delete Profile</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;
