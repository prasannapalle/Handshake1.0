import React,{ Component } from "react";
import axios from "axios";
import dateFormat from 'dateformat';

class CompanyDashboard extends Component
{
    constructor(props)
    {

        super(props);
        this.state = 
    {
        msg : [],
        disablefields : true,
        companyname : "",
        authFlag: 0
    }

    this.jobtitlehandler = this.jobtitlehandler.bind(this);
    this.postingdatehandler = this.postingdatehandler.bind(this);
    this.applicationdeadlinehandler = this.applicationdeadlinehandler.bind(this);
    this.locationhandler = this.locationhandler.bind(this);
    this.salaryhandler = this.salaryhandler.bind(this);
    this.jobdescriptionhandler = this.jobdescriptionhandler.bind(this);
    this.jobcategoryhandler = this.jobcategoryhandler.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    } 


    jobdescriptionhandler(event)
    {
      this.setState({jobdescription: event.target.value});

    }

    jobtitlehandler(event) {
        this.setState({jobtitle: event.target.value});
      }

      jobcategoryhandler(event)
      {
        this.setState({jobcategory: event.target.value});
      }

      salaryhandler(event)
      {
        this.setState({salary: event.target.value});

      }


      postingdatehandler(event)
      {
        this.setState({posting: event.target.value});
      }


      applicationdeadlinehandler(event)
      {
        this.setState({applicationdeadline: event.target.value});

      }


      locationhandler(event)
      {
        this.setState({location : event.target.value});

      }
componentWillMount() {
    this.setState({
        msg: []
    });
}


componentDidMount(){
    axios.get('http://localhost:3001/displayjobdetails')
            .then((response) => {
                console.log("This is getting printed", response.data);
                const data = response.data["results"];
                console.log("data from console", data);
            //update the state with the response data
            this.setState({
                msg : data,
                companyname : sessionStorage.getItem("companyname")

            });
            console.log('message from didmount: ', this.state.msg);
            console.log("companyname in axios",this.state.companyname);
        });
}

editjobs = (e) => {

}


enablefields = (props) => {
    console.log("in enable fields");
   
        props.disabled = false  
}


handleLoginClick() {
  this.setState({isLoggedIn: true});
}

handleLogoutClick() {
  this.setState({isLoggedIn: false});
}

submitnewjob = () => {
  const data = {
    jobtitle : this.state.jobtitle,
    posting:this.state.posting,
    applicationdeadline : this.state.applicationdeadline,
    location:this.state.location,
    salary:this.state.salary,
    jobdescription:this.state.jobdescription,
    jobcategory:this.state.jobcategory
    }
  axios.post("http://localhost:3001/submitnewjob", data).then(response => {
    console.log("Status Code : ", response.data);
    if(response.data === "success")
    {
    this.setState({
      authFlag : 1
    })
    }
  });
};

submitmyJourney = (event, id, name) => {
  const data = {
    id: id,
    myJourney: this.state.myJourney
  };
  axios.post("http://localhost:3001/myjourney", data).then(response => {
    console.log("Status Code : ", response.status);
    if (response.status === 200) {
      console.log("Updated carrierObjective details successfully");
    } else {
      console.log("Error Updating carrierObjective page");
    }
  });
};

render() {


    let rendermsg = null;
    rendermsg = this.state.msg;
    const isLoggedIn = this.state.isLoggedIn;
    var button;
    var signupform;
    var loginform;
    let redirectVar = null;
    var viewapplications;


    function viewapplications()
{
  console.log("inside view applications");
  return <h1>students who applied</h1>;

}

   
    function AddnewPost(props) {
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
        return <h1 align="center"> <h2>List of Job Postings</h2></h1>;
      }


      
    function LoginButton(props) {
      return (
        <div align="center"><button align="center"  style={{marginLeft : "230px"}} class="btn btn-primary" onClick={props.onClick}>
         <span>Add a New Job Posting</span>
         <br></br>
        </button>   
        </div>         
      );
    }
    
    function LogoutButton(props) {
      return (
        <button onClick={props.onClick} class="btn btn-primary">
          Back to CompanyDashboard
                    </button>
      );
    }

      if (isLoggedIn) {
        button = <LogoutButton onClick={this.handleLogoutClick} />;
  
        
       
        signupform = 
        
        (   
          <div class="container register-form">
           
          
      <div class="form">
          <div class="note">
              <h2>Add a new Job Posting</h2>
          </div>

          <div class="form-content" align="center">
          <div class="row">
          <div class="col-md-6">
              <div class="form-group">
                 
                  <input type="text" class="form-control" onChange = {this.jobtitlehandler}  placeholder="Enter Job Title" name="jobtitle"  required/>
              </div>
              </div>
              </div>
              </div>
              <div class="form-content" align="center">
          <div class="row">
          <div class="col-md-6">
              <div class="form-group">
                 
                  <input type="text" class="form-control" onChange = {this.postingdatehandler}  placeholder="Enter Posting Date" name="posting"  required/>
              </div>
              </div>
              </div>
              </div>
              <div class="form-content" align="center">
          <div class="row">
          <div class="col-md-6">
              <div class="form-group">
                 
                  <input type="text" class="form-control" onChange = {this.applicationdeadlinehandler}  placeholder="Enter Application Deadline" name="applicationdeadline"  required/>
              </div>
              </div>
              </div>
              </div>
              <div class="form-content" align="center">
          <div class="row">
          <div class="col-md-6">
              <div class="form-group">
                 
                  <input type="text" class="form-control" onChange = {this.locationhandler}  placeholder="Enter Location" name="location"  required/>
              </div>
              </div>
              </div>
              </div>
              <div class="form-content" align="center">
          <div class="row">
          <div class="col-md-6">
              <div class="form-group">
                 
                  <input type="text" class="form-control" onChange = {this.salaryhandler}  placeholder="Enter Salary" name="salary"  required/>
              </div>
              </div>
              </div>
              </div>
              <div class="form-content" align="center">
          <div class="row">
          <div class="col-md-6">
              <div class="form-group">
                 
                  <input type="text" class="form-control" onChange = {this.jobdescriptionhandler}  placeholder="Enter Job Description" name="jobdescription"  required/>
              </div>
              </div>
              </div>

              <div class="row">
          <div class="col-md-6">
              <div class="form-group">
                 
                  <input type="text" class="form-control" onChange = {this.jobcategoryhandler}  placeholder="Enter Job Category" name="jobcategory"  required/>
              </div>
              </div>
              </div>

              </div>

              </div>
              <div>
                 <button
               class="btn btn-primary"
                onClick={this.submitnewjob}
              >Submit new JobPosting</button>
              </div>
              </div>
        );   
      }

      else {
        
        button = <LoginButton onClick={this.handleLoginClick} />;
       
        
            console.log("logged In inside console")
           
            const element = <Welcome name="Sara" />;
        loginform =  (  

   this.state.msg.map(job => {
          return(
            
             <div className="card">
               
            <table align="center">
              <tbody>
               
                <tr>
                  <td>Title : {job.jobtitle}</td>
                   </tr>
                <tr>
                  
                  <td>Posting Date : {dateFormat(job.posting, "mmmm dS, yyyy")}</td></tr>
                <tr>
                 
                  <td>Application Deadline : {dateFormat(job.applicationdeadline, "mmmm dS, yyyy")}</td></tr>
                <tr>
                  
                  <td>Location : {job.location}</td></tr>
                <tr>
                 
                  <td> Salary : {job.salary} </td></tr>
                <tr>
                  
                  <td>Description : {job.jobdescription}</td></tr>
                <tr>
                  
                  <td>Job Category : {job.jobcategory}</td></tr>
                            
             <viewapplications class="btn btn-primary"> View Applications </viewapplications> 

              </tbody>
              </table>
              <table>
                <tbody>
          <tr>{viewapplications}</tr>
                </tbody>
              </table>
              </div>
                    
          )
      }))
           
      }




    function Welcome(props) {
        return <h1>Hello, {props.name} </h1>;
      }     
  

   
          return (
            <div>
              <Welcome name={this.state.companyname}/>
            <AddnewPost isLoggedIn={isLoggedIn} />
          
            <div align="center">
             {button}
             <br></br>
           {signupform}
           {loginform}
            </div>
            </div> 
        );
    }

}

export default CompanyDashboard;