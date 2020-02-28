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
            countryvalue:"",
            studentAllDetailsResult: [],
            studentAllEduDetailsResult: [],
            studentAllWorkDetailsResult: [],
            myJourney: [],
            yearofPassing: "",
            collegeName: "",
            degree: "",
            major: ""
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


            axios.get("http://localhost:3001/profile").then(response => {
              //update the state with the response data
              console.log("Details  :::", response);
              this.setState({
                studentAllDetailsResult: this.state.studentAllDetailsResult.concat(
                  response.data["results"]
                )
              });
              this.setState({
                myJourney: this.state.myJourney.concat(response.data)
              });
            });
            console.log("in componentDidMount");
            axios.get("http://localhost:3001/profileEduDetails").then(response => {
              //update the state with the response data
              console.log("Education  :::", response);
              this.setState({
                studentAllEduDetailsResult: this.state.studentAllEduDetailsResult.concat(
                  response.data["results"]
                )

              
              });
              console.log("in my data",this.state.studentAllEduDetailsResult);
            });
            console.log("in componentDidMount");
            axios.get("http://localhost:3001/profileWorkDetails").then(response => {
              //update the state with the response data
              console.log("Work  :::", response);
              this.setState({
                studentAllWorkDetailsResult: this.state.studentAllWorkDetailsResult.concat(
                  response.data["results"]
                )
              });
            });
    }


    handlemyWorkChange = (e, id, name) => {
      const studentWorkDetails = this.state.studentAllWorkDetailsResult;
      studentWorkDetails.map(studentWorkDetail => {
        if (studentWorkDetail.student_id === id) {
          studentWorkDetail[name] = e.target.value;
        }
      });
      console.log("studentEduDetails", studentWorkDetails);
      this.setState({ studentAllEduDetailsResult: studentWorkDetails });
    };


    handlemyEduChange = (e, id, name) => {
      const studentEduDetails = this.state.studentAllEduDetailsResult;
      studentEduDetails.map(studentEduDetail => {
        if (studentEduDetail.student_id === id) {
          studentEduDetail[name] = e.target.value;
          studentEduDetail.edited = true;
        }
      });
      console.log("studentEduDetails", studentEduDetails);
      this.setState({ studentAllEduDetailsResult: studentEduDetails });
    };

    redirecttoUpdateProfilePage() {
      this.props.history.push("/Profile");
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


  let studentDetails1 = this.state.studentAllDetailsResult.map(
    studentAllDetailResult => {
      console.log("Id iss::::::" + studentAllDetailResult.studentDetailsId);
      return (
        <div>
          <form>
            <input
              class="editableinput2"
              type="text"
              placeholder={studentAllDetailResult.carrierObjective}
              onChange={this.handlemyJourneyChange}
            />
            <button
              class="editButton"
              onClick={event =>
                this.submitmyJourney(
                  event,
                  studentAllDetailResult.studentDetailsId,
                  "carrierObjective"
                )
              }
            >
              Apply Changes
            </button>
          </form>
        </div>
      );
    }
  );


  let studentWorkDetails = this.state.studentAllWorkDetailsResult.map(
    studentAllWorkDetailResult => {
      return (
        <div class="card">
          <form>
            <input
              onChange={e =>
                this.handlemyWorkChange(
                  e,
                  studentAllWorkDetailResult.workExpDetailsId,
                  "companyName"
                )
              }
              class="editableinput"
              name="companyName"
              placeholder={studentAllWorkDetailResult.companyname}
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.handlemyWorkChange(
                  e,
                  studentAllWorkDetailResult.workExpDetailsId,
                  "title"
                )
              }
              class="editableinput"
              name="title"
              placeholder={studentAllWorkDetailResult.title}
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.handlemyWorkChange(
                  e,
                  studentAllWorkDetailResult.workExpDetailsId,
                  "startDate"
                )
              }
              class="editableinput"
              name="startDate"
              placeholder={studentAllWorkDetailResult.startdate}
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.handlemyWorkChange(
                  e,
                  studentAllWorkDetailResult.workExpDetailsId,
                  "endDate"
                )
              }
              class="editableinput"
              name="endDate"
              placeholder={studentAllWorkDetailResult.enddate}
            ></input>
            <button
              class="editButton"
              onClick={event =>
                this.submitWorkDetails(
                  event,
                  studentAllWorkDetailResult.workExpDetailsId
                )
              }
            >
              Apply Changes
            </button>
          </form>
        </div>
      );
    }
  );


  let studentEducationDetails = this.state.studentAllEduDetailsResult.map(
    studentAllEduDetailResult => {
      return (
        <div class="card">
          <form>
            <input
              onChange={e =>
                this.handlemyEduChange(
                  e,
                  studentAllEduDetailResult.student_id,
                  "collegeName"
                )
              }
              name="collegeName" 
              class="editableinput3"
              type="text"
              placeholder={studentAllEduDetailResult.collegename}
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.handlemyEduChange(
                  e,
                  studentAllEduDetailResult.studentEduDetailsId,
                  "degree"
                )
              }
              class="editableinput"
              name="degree"
              placeholder={studentAllEduDetailResult.Degree}
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.handlemyEduChange(
                  e,
                  studentAllEduDetailResult.studentEduDetailsId,
                  "major"
                )
              }
              class="editableinput"
              name="major"
              placeholder={studentAllEduDetailResult.Major}
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.handlemyEduChange(
                  e,
                  studentAllEduDetailResult.studentEduDetailsId,
                  "yearofPassing"
                )
              }
              class="editableinput"
              name="yearofPassing"
              placeholder={studentAllEduDetailResult.Yearofpassing}
            ></input>

            <button
              class="editButton"
              onClick={event =>
                this.submitEduDetails(
                  event,
                  studentAllEduDetailResult.studentEduDetailsId
                )
              }
            >
              Apply Changes
            </button>
          </form>
        </div>
      );
    }
  );

        return(


         
            <body>
              <button
                class="editButton"
                onClick={this.redirecttoUpdateProfilePage.bind(this)}
              >
                Go to Profile
              </button>
              <div class="row">
                <div class="leftcolumn">
                  <div class="card">
                    <h2>My Journey</h2>
                    {<p>{studentDetails1}</p>}
                  </div>
                  <br />
      
                  <h2 class="Profileheading">
                     Education
                     <button class="editButton">Add Education</button>
                   </h2>
      
                   {studentEducationDetails}
                   <br />
      
                   <h2 class="Profileheading">
                     Work Experience
                     <button class="editButton">Add Work</button>
                   </h2>
      
                   {studentWorkDetails}
                 </div>
               
               </div>
      
               <div class="footer">
                 <h2>Footer</h2>
               </div>
             </body>
        
        
        );
    }
}

export default Student;