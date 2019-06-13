import React, { Component } from 'react';
import {register} from '../context';
import '../App.css';

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            error: '',
            access: false
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
        const {name, email, password} = this.state;
        const user = {
            name,
            email,
            password
        }

        register(user).then(res => {
            if(res.error){
                this.setState({error: res.error})
            }
            else this.setState({
                name: '',
                email: '',
                password: '',
                error: '',
                access: true
            })
        })
    };

    
    registerForm = () => {
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
        const {error, access} = this.state;
        return (
            <div className="container form">
              <h1 className="text-center my-3">Register</h1>

              <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{display: error ? '' : "none"}}>
                 <div style={{fontFamily:'cursive'}}>
                    {error}
                 </div>
              </div>

              <div className="alert alert-success alert-dismissible fade show" role="alert" style={{display: access ? '' : "none"}}>
                 <div style={{fontFamily: 'cursive'}}>
                    Account successfully created... Please Sign in.
                 </div>
              </div>

              {this.registerForm()}
            </div>
        )
    }
}

export default Signup;
