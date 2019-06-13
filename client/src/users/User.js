import React, { Component } from 'react';
import {usersList} from '../context';

class Users extends Component {
    state = {
        users: []
    }

    componentDidMount(){
       usersList().then(data => {
           if(data.error) console.log(data.error)
           else{
               this.setState({users: data})
           }
       })
       .catch(err => console.log(err))
    }

    render() {
        const {users} = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>
                <div className="card">
                   {users.map((user,index) => (
                       <div key={index}>
                          {user.name}
                       </div>
                   ))}
                </div>
            </div>
        )
    }
}

export default Users;
