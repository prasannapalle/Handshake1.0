import React, {Component} from 'react';
import axios from 'axios';

class Company extends Component
{

    constructor(props)
    {
        super(props);


        this.state = {
            company :"",
            emailid : "",
            password : "",
            location : "",
            msg : ""
        }

        this.companynamehandler = this.companynamehandler.bind(this);
        this.emailidhandler = this.emailidhandler.bind(this);
        this.passwordhandler = this.passwordhandler.bind(this);
        this.locationhandler = this.locationhandler.bind(this);
        this.submitSignup = this.submitSignup.bind(this);

    }

    companynamehandler = (e) => {
        
        this.setState({
            company: e.target.value
        })

    }

    
    emailidhandler = (e) => {
        
        this.setState({
            emailid: e.target.value
        })

    }

    passwordhandler = (e) => {
        
        this.setState({
            password: e.target.value
        })

    }  


    locationhandler = (e) => {
        
        this.setState({
            location: e.target.value
        })

    }  

    submitSignup = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();

        const data = {
            company : this.state.company,
            emailid : this.state.emailid,
            password : this.state.password,
            location : this.state.location
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/companysignup',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.data === "success"){
                    this.setState({
                        authFlag : true,
                        msg: "Company Registration Successfull"

                        
                    })
                }
                else{
                    this.setState({
                        authFlag : false,
                        
                    })
                }
            });
    }


    render()
    {

        var rendermsg = null;
        if(this.state.msg)
        {
            rendermsg = <h1>this.state.msg</h1>
        }
        return(

            <div style={{backgroundColor:"red"}}>
                {rendermsg}
            <div class="container register-form">
            <div class="form">
                <div class="note">
                    <p>Company Registration Form</p>
                </div>

                <div class="form-content">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" onChange = {this.companynamehandler}  placeholder="Enter company name *" name="company"  required/>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" onChange = {this.emailidhandler}  placeholder="Enter Email ID" name="emailid"  required/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="password" class="form-control" onChange = {this.passwordhandler}  placeholder="Enter Password" name="password" required/>
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control"  onChange = {this.passwordhandler} placeholder="Confirm Password" name="password"  required/>
                            </div>
                        </div>

                        <div>
                        <input type="text" class="form-control" onChange = {this.locationhandler}  placeholder="Enter Location" name="location"  required/>

                        </div>
                    </div>
                    <button onClick = {this.submitSignup} class="btn btn-primary">Sign Up</button>                 

                </div>
            </div>
        </div>
        </div>
        )
    }
}

export default Company;