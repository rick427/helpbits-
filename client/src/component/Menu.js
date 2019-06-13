import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {logout, isAuthenticated} from '../context'

const isActive = (history, path) => {
    if(history.location.pathname === path){
        return {color: "#ff9900"}
    }
    else{
        return {color: "#ffffff"}
    }
}


const Menu = ({history}) => {
    const {user} = isAuthenticated();
    return (
        <div>
            <ul className="nav nav-tabs bg-secondary">
                <li className="nav-item">
                   <Link className="nav-link" to="/" style={isActive(history, "/")}>
                       Home
                    </Link>
                </li>

                <li className="nav-item">
                   <Link className="nav-link" to="/users" style={isActive(history, "/users")}>
                       Users
                    </Link>
                </li>
          
                {!isAuthenticated() && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register" style={isActive(history, "/register")}>
                                Register
                            </Link>       
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/login" style={isActive(history, "/login")}>
                                Login
                            </Link>    
                        </li>
                    </>
                )}

                {isAuthenticated() && (
                    <>
                    <li className="nav-item">
                        <Link 
                           className="nav-link" 
                           style={(isActive(history, `/user/${user._id}`))}
                           to={`/user/${user._id}`}
                        >
                            {`${user.name}'s profile`}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <div 
                            className="nav-link" 
                            onClick={() => logout(() => history.push('/'))} 
                            style={{color: '#ffffff', cursor: "pointer"}}
                        >
                        Logout
                        </div>    
                    </li>
                    </>
                )}
            </ul>
        </div>
    );
}





export default withRouter(Menu);
