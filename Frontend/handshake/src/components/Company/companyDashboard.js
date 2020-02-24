import React,{ Component } from "react";
import axios from "axios";

class CompanyDashboard extends Component
{
    constructor(props)
    {

        super(props);
        this.state = 
    {
        msg : [],
        disablefields : true
    }


    this.jobtitlehandler = this.jobtitlehandler.bind(this);


    } 



    jobtitlehandler(event) {
        this.setState({jobtitle: event.target.value});
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
                msg : data
            });
            console.log('message from didmount: ', this.state.msg)
        });
}

editjobs = (e) => {

}


enablefields = (e) => {
    console.log("in enable fields");
    this.setState({
        disablefields : false
    });
    
}

render() {
    let rendermsg = null;
    rendermsg = this.state.msg;
    let details = this.state.msg.map(job => {
      return(
        <table>
          <tbody>
           
            <tr><input type="text" placeholder={job.jobtitle} name="jobtitle" onChange = {this.jobtitlehandler} disabled={this.state.disablefields}/></tr>
            <tr><input type="text" placeholder={job.posting} name="jobposting" onChange = {this.jobpostinghandler} disabled={this.state.disablefields}/></tr>
            <tr><input type="text" placeholder={job.applicationdeadline} name="applicationdeadline" onChange = {this.applicationdeadlinehandler} disabled={this.state.disablefields}/></tr>
            <tr><input type="text" placeholder={job.location} name="applicationdeadline" onChange = {this.locationhandler} disabled={this.state.disablefields}/></tr>
            <tr><input type="text" placeholder={job.salary} name="applicationdeadline" onChange = {this.salaryhandler} disabled={this.state.disablefields}/></tr>
            <tr><input type="text" placeholder={job.description} name="applicationdeadline" onChange = {this.description} disabled={this.state.disablefields}/></tr>

            <tr><input type="text" placeholder={job.jobcategory} name="applicationdeadline" onChange = {this.jobcategory} disabled={this.state.disablefields}/></tr>
            <button onClick={this.enablefields} class="btn btn-primary">Edit</button>               
         
         <button onClick={this.editjobs} class="btn btn-primary"> Submit </button> 
          </tbody>
          </table>
      )
  });


        return(
        
        <div className="card">
          <div></div>
        <div className="row-fluid">
          <div className="span2">
          {details}
         </div>
          <div className="span10">
          </div>
         
        </div>
      </div>  

        )
    }

}

export default CompanyDashboard;