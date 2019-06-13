import React, { Component } from 'react';
import {usersList} from '../context';
import {Link} from 'react-router-dom';
import defaultImage from '../userImg.png';

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
            <div className="container-fluid">
                <h2 className="text-muted mt-3 mb-3">Users</h2>

                <div className="row">
                   {users.map((user,index) => (
                       <div className="card col-md-3 mx-4 my-3" key={index}>
                           <img 
                               src={defaultImage} 
                               alt="card" 
                               className="card-img-top" 
                               style={{width: "62%", objectFit: "cover", margin: "1px"}}
                            />
                           <div className="card-body">
                               <h5 className="card-title">{user.name}</h5>
                               <p className="card-text">
                                   {user.email}
                               </p>
                               <Link to={`user/${user._id}`} className="btn btn-raised btn-success">
                                   View Profile
                                </Link>
                           </div>
                       </div>
                   ))}
                </div>
            </div>
        )
    }
}

export default Users;
