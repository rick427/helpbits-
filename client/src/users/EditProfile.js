import React, { Component } from 'react';
import {isAuthenticated, profileRequest, updateUser, updateProfile} from '../context';
import {Redirect} from 'react-router-dom';
import defaultImage from '../userImg.png';
import '../App.css';

class EditProfile extends Component {
    state = {
      id: '',
      name: '',
      email: '',
      password: '',
      redirect: false,
      error: '',
      filesize: 0,
      loading: false,
      about: ''
    }

    componentDidMount(){
        this.userData = new FormData()
        const id = this.props.match.params.id;
        this.initialize(id);
    }

    isValid = () => {
        const {name, email, password, filesize} = this.state;
        if (filesize > 100000) {
            this.setState({ error: "File size should be less than 100kb", loading: false});
            return false;
        }
        if (name.length === 0) {
            this.setState({ error: "Name is required", loading: false});
            return false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({
                error: "A valid Email is required", 
                loading: false
            });
            return false;
        }
        if (password.length >= 1 && password.length <= 5) {
            this.setState({
                error: "Password must be at least 6 characters long",
                loading: false
            });
            return false;
        }
        return true;
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
                    about: data.about,
                    error: ''
                })
            }
        })
        .catch(err => console.log(err));
    }

    handleChange = e => {
        this.setState({error: ""})
        const {name, value, files} = e.target;
        const vals = name === 'photo' ? files[0] : value
        const  filesize = name==='photo' ? files[0].size : 0
        this.userData.set(name, vals)
        this.setState({[name]: vals, filesize});
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({loading: true});

        if(this.isValid()){
            const id = this.props.match.params.id;
            const token = isAuthenticated().token;

            updateProfile(id, token, this.userData).then(res => {
                if(res.error){
                    this.setState({redirect: true})
                }
                else{
                    updateUser(res, () => {
                          this.setState({
                            redirect: true
                        })
                    })
                }
            })
        }
    };

    registerForm = () => {
        const {redirect} = this.state;
        if(redirect){
            return <Redirect to={`/user/${this.state.id}`} />
        }
        return (
            <form autoComplete="off">
                  <div className="form-group">
                      <label className="text-muted bmd-label-floating">Profile Photo</label>
                      <input 
                         className="form-control" 
                         type="file"
                         accept="image/*"
                         name="photo"
                         onChange={this.handleChange} 
                        />
                  </div>
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
                      <label className="text-muted bmd-label-floating">About</label>
                      <textarea 
                         className="form-control" 
                         type="text"
                         name="about" 
                         value={this.state.about}
                         onChange={this.handleChange} 
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
        const {id,redirect,error,loading} = this.state;
        if(redirect){
            return <Redirect to={`/user/${id}`} />
        }
        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` : defaultImage
        return (
            <div className="container form">
                <h2 className="mt-5 mb-5 text-muted text-center">Edit Profile</h2>
                
                {loading ? 
                (
                 <div style={{textAlign:'center'}}>
                      <i className="fas fa-cog fa-spin fa-3x" style={{color: 'teal'}}/>
                 </div>
                ) : ("")
               }

                <div style={{display: error ? '': 'none'}} className="alert alert-danger">
                    {error}
                </div>

                <img 
                     src={photoUrl} 
                     className="img-thumbnail" 
                     style={{width: 'auto', height: '300px'}} 
                     onError={i => (i.target.src = `${defaultImage}`)}
                     alt={this.state.name}
                />

                {this.registerForm()}
            </div>
        )
    }
}

export default EditProfile;
