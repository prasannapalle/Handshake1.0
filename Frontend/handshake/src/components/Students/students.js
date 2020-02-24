import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css'
class Student extends Component{

    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
          
            msg: [],
            namevalue : "",
            dobvalue : "",
            cityvalue: "",
            statevalue:"",
            countryvalue:""
        }

        this.namehandleChange = this.namehandleChange.bind(this);
        this.dobhandleChange = this.dobhandleChange.bind(this);
        this.cityhandleChange = this.cityhandleChange.bind(this);
        this.statehandleChange = this.statehandleChange.bind(this);
        this.countryhandleChange = this.countryhandleChange.bind(this);
    }

    namehandleChange(event) {
        this.setState({namevalue: event.target.value});
      }

      dobhandleChange(event) {
        this.setState({dobvalue: event.target.value});
      }

      cityhandleChange(event) {
        this.setState({cityvalue: event.target.value});
      }

      statehandleChange(event) {
        this.setState({statevalue: event.target.value});
      }

      countryhandleChange(event) {
        this.setState({countryvalue: event.target.value});
      }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            msg: [],
            namevalue:"",
            dobvalue:"",
            cityvalue:"",
            statevalue:"",
            countryvalue:"",
            authFlag: false

        })
    }

    componentDidMount(){
        axios.get('http://localhost:3001/displaystudentdetails')
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

    submiteditstudent = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            namevalue : this.state.namevalue,
            dobvalue : this.state.dobvalue,
            cityvalue : this.state.cityvalue,
            statevalue : this.state.statevalue,
            countryvalue : this.state.countryvalue
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/editbasicdetails', data)
            .then(response => {
                console.log("res",response.data);
                if (response.data === "success") {
                    this.setState({
                        authFlag: true
                    })}
                else{
                  console.log("else prt");
                        this.setState({
                            authFlag: false,
                            
                        })
                }
            });   
    }

    editstudent = (e) => {
      this.props.history.push("/studenteditform");
    }
   
    render() {
    let rendermsg = null;
    rendermsg = this.state.msg;
    let details = this.state.msg.map(student => {
      return(
        <table>
          <tbody>
            <thead></thead>
          <tr>
              <td>{student.name}</td>
              <td>{student.emailId}</td>
              <td>{student.collegename}</td>
          </tr>
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
           <button onClick={this.editstudent} class="btn btn-primary">Edit </button>                 
         
        </div>
      </div>  

      
  //     <div className="card">
  
  // <div class="container">
  //   <h4><b>John Doe</b></h4>
  //   <p>Architect & Engineer</p>
  // </div>
  //    </div>

        )
    }
}

export default Student;