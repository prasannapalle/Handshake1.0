import React, { Component } from "react";
import "../../profile.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentAllDetailsResult: [],
      studentAllEduDetailsResult: [],
      studentAllWorkDetailsResult: [],
      myJourney: [],
      yearofPassing: "",
      collegeName: "",
      degree: "",
      major: ""
    };
    this.handlemyJourneyChange = this.handlemyJourneyChange.bind(this);
    this.handlemyEduChange = this.handlemyEduChange.bind(this);
    this.submitmyJourney = this.submitmyJourney.bind(this);
    this.submitEduDetails = this.submitEduDetails.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("in componentDidMount");
    axios.get("http://localhost:3001/profile").then(response => {
      //update the state with the response data
      console.log("Details  :::", response);
      this.setState({
        studentAllDetailsResult: this.state.studentAllDetailsResult.concat(
          response.data
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
          response.data
        )
      });
    });
    console.log("in componentDidMount");
    axios.get("http://localhost:3001/profileWorkDetails").then(response => {
      //update the state with the response data
      console.log("Work  :::", response);
      this.setState({
        studentAllWorkDetailsResult: this.state.studentAllWorkDetailsResult.concat(
          response.data
        )
      });
    });
  }

  redirecttoUpdateProfilePage() {
    this.props.history.push("/Profile");
  }

  handlemyJourneyChange = e => {
    this.setState({
      myJourney: e.target.value
    });
  };

  handlemyEduChange = (e, id, name) => {
    const studentEduDetails = this.state.studentAllEduDetailsResult;
    studentEduDetails.map(studentEduDetail => {
      if (studentEduDetail.studentEduDetailsId === id) {
        studentEduDetail[name] = e.target.value;
        studentEduDetail.edited = true;
      }
    });
    console.log("studentEduDetails", studentEduDetails);
    this.setState({ studentAllEduDetailsResult: studentEduDetails });
  };

  handlemyWorkChange = (e, id, name) => {
    const studentWorkDetails = this.state.studentAllWorkDetailsResult;
    studentWorkDetails.map(studentWorkDetail => {
      if (studentWorkDetail.workExpDetailsId === id) {
        studentWorkDetail[name] = e.target.value;
      }
    });
    console.log("studentEduDetails", studentWorkDetails);
    this.setState({ studentAllEduDetailsResult: studentWorkDetails });
  };

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    //iterate over books to create a table row
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
    let studentDetails = this.state.studentAllDetailsResult.map(
      studentAllDetailResult => {
        console.log("xxxx::::", studentAllDetailResult);
        return (
          <div class="card">
            <h2>Sai Krishna Nandikonda</h2>
            <div class="fakeimg" style={{ height: "100px;" }}>
              Image
            </div>
            <h4>Master's in Software Engineering</h4>
            <p>Spring 2020 - Present</p>
          </div>
        );
      }
    );

    //iterate over books to create a table row
    let studentEducationDetails = this.state.studentAllEduDetailsResult.map(
      studentAllEduDetailResult => {
        return (
          <div class="card">
            <form>
              <input
                onChange={e =>
                  this.handlemyEduChange(
                    e,
                    studentAllEduDetailResult.studentEduDetailsId,
                    "collegeName"
                  )
                }
                name="collegeName"
                class="editableinput3"
                type="text"
                placeholder={studentAllEduDetailResult.collegeName}
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
                placeholder={studentAllEduDetailResult.degree}
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
                placeholder={studentAllEduDetailResult.major}
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
                placeholder={studentAllEduDetailResult.yearofPassing}
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

    //iterate over books to create a table row
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
                placeholder={studentAllWorkDetailResult.companyName}
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
                placeholder={studentAllWorkDetailResult.startDate}
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
                placeholder={studentAllWorkDetailResult.endDate}
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
    return (
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
          <div class="rightcolumn">
            {studentDetails}
            <div class="card">
              <h3>Popular Post</h3>
              <div class="fakeimg">Image</div>
              <br />
              <div class="fakeimg">Image</div>
              <br />
              <div class="fakeimg">Image</div>
            </div>
            <div class="card">
              <h3>Follow Me</h3>
              <p>Some text..</p>
            </div>
          </div>
        </div>

        <div class="footer">
          <h2>Footer</h2>
        </div>
      </body>
    );
  }

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

  submitEduDetails = (event, id) => {
    const data = {
      studentAllEduDetailsResult: this.state.studentAllEduDetailsResult
    };
    axios
      .post("http://localhost:3001/updateEduDetails", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Updated edu details successfully");
        } else {
          console.log("Error Updating Profile page");
        }
      });
  };

  submitWorkDetails = (event, id) => {
    const data = {
      studentAllWorkDetailsResult: this.state.studentAllWorkDetailsResult
    };
    axios
      .post("http://localhost:3001/updateWorkDetails", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Updated work details successfully");
        } else {
          console.log("Error Updating work page");
        }
      });
  };
}

//export Profile Component
export default UpdateProfile;



