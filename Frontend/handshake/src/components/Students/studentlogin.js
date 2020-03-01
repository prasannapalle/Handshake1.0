import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';



class StudentLogin extends Component {
    constructor(props) {
      super(props);
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
      this.companynamehandler = this.companynamehandler.bind(this);
      this.emailidhandler = this.emailidhandler.bind(this);
      this.passwordhandler = this.passwordhandler.bind(this);
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
      this.locationhandler = this.locationhandler.bind(this);
      this.submitSignup = this.submitSignup.bind(this);
      this.state = {isLoggedIn: false,
        company :"",
        emailid : "",
        password : "",
        usrname : "",
        usrpwd : "",
        location : "",
        authFlag : false,
        companyname : "",
        msg : []
      }    
    }
    usernameChangeHandler = (e) => {
                this.setState({
                    usrname : e.target.value
                })
            }

    passwordChangeHandler = (e) => {
                this.setState({
                    usrpwd : e.target.value
                })
            }

    companynamehandler(e) {
        
        this.setState({
            company: e.target.value
        });

    }

    
    emailidhandler = (e) => {
        
        this.setState({
            emailid: e.target.value
        });

    }

    passwordhandler = (e) => {
        
        this.setState({
            password: e.target.value
        });

    }  


    locationhandler = (e) => {
        
        this.setState({
            location: e.target.value
        });

    }  

    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.usrname,
            password : this.state.usrpwd
        }
        console.log("data from axios", data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/companylogin',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                const data = response.data["results"];
                console.log("response data from axios", response.data);
            sessionStorage.setItem("companyname",response.data);
               
                if(response.data){
                    this.setState({
                        authFlag : true,
                        msg: data,
                        companyname : sessionStorage.getItem("companyname"),
                        errmsg:  <Redirect to= "/companydashboard"/>     
                    })

                    console.log("in login axios",this.state.msg);
                }
                else{
                    this.setState({
                        authFlag : false,
                        errmsg : "Incorrect Credentials"
                        
                    })
                }
            });
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
                console.log("response data from axios", response.data);
                sessionStorage.setItem("companyname",data.company)
                if(response.data === "success"){
                    this.setState({
                        authFlag : true,
                        msg: "Company Registration Successfull" ,
                        companyname : sessionStorage.getItem("companyname")
                    })
                    console.log("successfull registration",this.state.companyname);
                }
                else{
                    this.setState({
                        authFlag : false,
                    })
                }
            });
    }


    handleLoginClick() {
      this.setState({isLoggedIn: true});
    }
  
    handleLogoutClick() {
      this.setState({isLoggedIn: false});
    }
  
    render() {
      const isLoggedIn = this.state.isLoggedIn;
      var button;
      var signupform;
      var loginform;
      var rendermsg;
      let redirectVar = null;
      var red=null;
        if(this.state.authFlag==1)
       { red= <h1>Registration is successfull</h1>;
    console.log("auth",this.state.authFlag); }

      function LoginButton(props) {
        return (
          <div align="center"><button align="center"  style={{marginLeft : "230px"}} class="btn btn-primary" onClick={props.onClick}>
           <span>SignUp</span>
          </button>   
          </div>         
        );
      }
      
      function LogoutButton(props) {
        return (
          <button onClick={props.onClick} class="btn btn-primary">
            Back to Login 
                      </button>
        );
      }


      function Greeting(props) {
        const isLoggedIn = props.isLoggedIn;
        if (isLoggedIn) {
          return <UserGreeting />;
        }
        return <GuestGreeting />;
      }


      function UserGreeting(props) {
      return <div></div>;
     }
      
      function GuestGreeting(props) {
        return <h1 align="center">Are you a new User?Please sign up.</h1>;
      }

      if (isLoggedIn) {
        button = <LogoutButton onClick={this.handleLogoutClick} />;

        
       
        signupform = 
        
        (
            <div style={{backgroundColor:"black"}}>
                <button bg="primary" onClick={this.bl} >Go Back</button> 
            <div class="container register-form">
            <div class="form">
                <div class="note">
                    <p style={{color:"white"}}>Student Registration Form</p>
                </div>

                <div class="form-content">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input onChange = {this.nameChangeHandler} type="text" class="form-control" placeholder="Student name *" name="name" />
                            </div>
                            <div class="form-group">
                                <input onChange = {this.emailChangeHandler} type="text" class="form-control" placeholder="Emailid *" name="email" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" placeholder="Your Password *" name="password" />
                            </div>
                            <div class="form-group">
                                <input onChange = {this.collegenameChangeHandler} type="text" class="form-control" placeholder="College name *" name="collegename" />
                            </div>
                        </div>
                    </div>
                    <button onClick={this.submitreg} type="button" class="btnSubmit" >Signup</button>
                </div>
            
            </div>
        </div>
        {red}
        </div>
        )
        
      } 
      else {
          
        button = <LoginButton onClick={this.handleLoginClick} />;
       
        
            console.log("logged In inside console")
           
        
        loginform =  (<div class="container">
              
                  <div class="login-form">
                         <div class="main-div">
                              <div class="panel">
                                   <h2>Student Login</h2>
                                   <p>Please enter your username and password</p>
                                </div>
                                
                                 <div>
                                       <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="usrname" placeholder="Username"/>
                                  </div>
                                  <br></br>
                                   <div>
                                     <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="usrpwd" placeholder="Password"/>
                                   </div>
                                   <br></br>
                                  <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>        
                          </div>
                       </div>
        
                   </div>);
      }
  
      if(this.state.errmsg === 'success'){
        redirectVar = <Redirect to= "/companydashboard" />
        
       console.log("yes in console errmsg");
      }

      

      return (
        <div>
            {redirectVar}
        <div>
             {this.state.errmsg}
          <Greeting isLoggedIn={isLoggedIn} />
          {button}
          {signupform}
          {loginform}
        </div>
        
        </div>  
      );
    }
  }
  

export default StudentLogin;