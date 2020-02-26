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
    <div>Welcome to SignUp</div>
      );         
      
    } 
    else {
        
      button = <LoginButton onClick={this.handleLoginClick} />;
     
      
          console.log("logged In inside console")
         
      
      loginform =  (<div>Welcome to Login Form!!!</div>)
         
    }

    if(this.state.errmsg === 'success'){
      redirectVar = <Redirect to= "/companydashboard"/>
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


export default CompanyLogin;