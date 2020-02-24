import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';

class Create extends Component{

    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            BookID: "",
            Title: "",
            Author: "",
            errmsg : null,
            authFlag: false
        }
        //Bind the handlers to this classcomponentWillMount
        this.bookidChangeHandler = this.bookidChangeHandler.bind(this);
        this.titleChangeHandler = this.titleChangeHandler.bind(this);
        this.authorChangeHandler = this.authorChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    //username change handler to update state variable with the text entered by the user
    bookidChangeHandler = (e) => {
        this.setState({
            BookID: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    titleChangeHandler = (e) => {
        this.setState({
            Title: e.target.value
        })
    }


    authorChangeHandler = (e) => {
        this.setState({
            Author: e.target.value
        })
    }

    

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            BookID: this.state.BookID,
            Title: this.state.Title,
            Author: this.state.Author
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/create', data)
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
                            errmsg : "Book ID already exists"
                        })
                }
            });
                
          
    }

    render() {
    
        return(
            <div>
                
                <br/>
                <div class="container">
                    <form action="http://127.0.0.1:3000/create" method="post">

                        <div style={{ width: '30%' }} id="mymsg" class="form-group">
                           
                        </div>
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange={this.bookidChangeHandler} type="text" class="form-control" name="BookID" pattern="[0-9]+" placeholder="Book ID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange={this.titleChangeHandler} type="text" class="form-control" name="Title" pattern="" placeholder="Book Title"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange={this.authorChangeHandler} type="text" class="form-control" name="Author" pattern="" placeholder="Book Author"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                          
                            <button onClick={this.submitLogin} class="btn btn-primary">Create</button>                 

                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default Create;