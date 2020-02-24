import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Jobs from './Jobs/Jobs'
import Events from './Events/events'
import Company from './Company/company';
import Students from './Students/students';
import Navbar from './HomePage/Navbar';
import Studentedit from './Students/studentedit';
import CompanyLogin from './Company/companylogin';
import CompanyDashboard from './Company/companyDashboard';

class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/jobs" component={Jobs}/>
                <Route path="/students" component={Students}/>
                <Route path="/events" component={Events}/>
                <Route path="/companylogin" component={CompanyLogin}/> 
                <Route path="/studenteditform" component={Studentedit}/>
                <Route path="/companysignup" component={Company} />
                <Route path="/companydashboard" component={CompanyDashboard}/>
            
            </div>
        )
    }
}
//Export The Main Component
export default Main;