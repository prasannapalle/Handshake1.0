import React, { Component } from 'react';
import axios from 'axios';
import './student.css';

class Studentedit  extends Component
{
    constructor(props)
    {

        super(props);
        this.state = {
            msg:""
        }

    }

    render()
    {
        return(
            <div>Student edit form</div>
        );
    }
}

export default Studentedit; 