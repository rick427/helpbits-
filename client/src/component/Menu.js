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
    return (
        <div>
            <ul className="nav nav-tabs bg-secondary">
                <li className="nav-item">
                   <Link className="nav-link" to="/" style={isActive(history, "/")}>
                       Home
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
                        <div 
                            className="nav-link" 
                            onClick={() => logout(() => history.push('/'))} 
                            style={{color: '#ffffff', cursor: "pointer"}}
                        >
                        Logout
                        </div>    
                    </li>

                    <li className="nav-item">
                        <Link 
                           className="nav-link" 
                           style={Userstyles}
                           to={`/user/${isAuthenticated().user._id}`}
                        >
                            {`${isAuthenticated().user.name}'s profile`}
                        </Link>
                    </li>
                    </>
                )}
            </ul>
        </div>
    );
}

const Userstyles = {
    color: '#bbbbbb', 
    letterSpacing:"2px", 
    textTransform:"capitalize", 
    cursor: "pointer",
    fontWeight: "400"
}

export default withRouter(Menu);
