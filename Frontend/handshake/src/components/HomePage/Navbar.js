import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import '../../App.css';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    
    render()
    {
        //if Cookie is set render Logout Button
        let navLogin = null;
       
        return(
            <div>
            
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand">Handshake</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active"><Link to="/StudentLogin">Students</Link></li>
                        <li><Link to="/companylogin">Company</Link></li>
                        <li><Link to="/">Jobs</Link></li>
                        <li><Link to="/events">Events</Link></li>
                    </ul>
                    {/* {navLogin} */}
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;