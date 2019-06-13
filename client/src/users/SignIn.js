import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {login, authenticate} from '../auth';
import '../App.css';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            redirect: false,
            loading: false
        }
    }

    handleChange = e => {
      this.setState({
          [e.target.name]: e.target.value, 
          error: ''
      });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({loading: true});

        const {email, password} = this.state;
        const user = {
            email,
            password
        }

        login(user).then(data => {
            if(data.error){
                this.setState({error: data.error, loading: false});
            }
            else {
                //authenticate
                authenticate(data, () => {
                    this.setState({redirect: true})
                })
            }
        })
    };

  
    loginForm = () => {
        return (
            <form autoComplete="off">
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
                         value={this.state.password}
                         name="password"
                        />
                  </div>
                <button className="btn btn-raised btn-primary" onClick={this.handleSubmit}>
                    Submit
                </button>
            </form>  
        )
    }

    render() {
        const {error, redirect, loading} = this.state;

        if(redirect){
            return <Redirect to="/" />
        }
        return (
            <div className="container loginForm">
              <h1 className="text-center my-3">Login</h1>

              <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{display: error ? '' : "none"}}>
                 <div style={{fontFamily:'cursive'}}>
                    {error}
                 </div>
              </div>
              
              {loading ? 
                (
                 <div style={{textAlign:'center'}}>
                      <i className="fas fa-cog fa-spin fa-3x" style={{color: 'teal'}}/>
                 </div>
                ) : ("")
              }

              {this.loginForm()}
            </div>
        )
    }
}

export default SignIn;
