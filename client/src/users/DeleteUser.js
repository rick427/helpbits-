import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {isAuthenticated, removeProfile, logout} from '../context';


class DeleteUser extends Component {
    state = {
        redirect: false
    }

    deleteAccount = () => {
      const token = isAuthenticated().token;
      const id = this.props.id;
      
      removeProfile(id, token)
       .then(data => {
           if(data.error) console.log(data.error)
           else{
               logout(() => console.log("User is deleted"))
               this.setState({redirect: true});
           }
       })
    }

    handleDelete = () => {
      let confirm = window.confirm("Are you sure you want to delete your account");
      if(confirm){
          this.deleteAccount()
      }
    }

    render() {
        if(this.state.redirect){
            return <Redirect to="/" />
        }
        return (
            <button onClick={this.handleDelete} className="btn btn-raised btn-danger">
                Delete Profile
            </button>
        )
    }
}

export default DeleteUser
