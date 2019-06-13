import React, { Component } from 'react';
import {isAuthenticated, profileRequest, updateProfile} from '../context';
import {Redirect} from 'react-router-dom';
import '../App.css';

class EditProfile extends Component {
    state = {
      id: '',
      name: '',
      email: '',
      password: '',
      redirect: false
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
                    error: ''
                })
            }
        })
        .catch(err => console.log(err));
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value, 
            error: ''
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const {name, email, password} = this.state;
        const user = {
            name,
            email,
            password: password || undefined
        }
        const id = this.props.match.params.id;
        const token = isAuthenticated().token;

        updateProfile(id, token, user).then(res => {
             if(res.error){
                 this.setState({error: res.error})
             }
             else this.setState({
                 redirect: true
             })
         })
    };

    registerForm = () => {
        const {redirect} = this.state;
        if(redirect){
            return <Redirect to={`/user/${this.state.id}`} />
        }
        return (
            <form autoComplete="off">
                  <div className="form-group">
                      <label className="text-muted bmd-label-floating">Name</label>
                      <input 
                         className="form-control" 
                         type="text"
                         name="name" 
                         value={this.state.name}
                         onChange={this.handleChange} 
                        />
                  </div>
                  <div className="form-group">
                      <label className="text-muted bmd-label-floating">Email</label>
                      <input 
                          className="form-control" 
                          type="email" 
                          value={this.state.email}
                          onChange={this.handleChange}
                          name="email"
                        />
                  </div>
                  <div className="form-group">
                      <label className="text-muted bmd-label-floating">Password</label>
                      <input 
                         className="form-control" 
                         type="password"
                         onChange={this.handleChange}
                         value={this.state.password || ''}
                         name="password"
                        />
                  </div>
                <button className="btn btn-raised btn-primary" onClick={this.handleSubmit}>
                    Update
                </button>
            </form>  
        )
    }

    render() {
        return (
            <div className="container form">
                <h2 className="mt-5 mb-5 text-muted text-center">Edit Profile</h2>
                {this.registerForm()}
            </div>
        )
    }
}

export default EditProfile;
