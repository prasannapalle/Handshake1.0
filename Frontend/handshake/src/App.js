import React, { Component } from 'react';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import Create from './components/Students/students'

//App Component

class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main/>
          {/* <Create/> */}
        </div>
      </BrowserRouter>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
