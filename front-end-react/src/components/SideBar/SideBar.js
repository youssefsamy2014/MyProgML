import React from 'react';
import {NavLink} from'react-router-dom';
import classes from './SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro,faVideo } from '@fortawesome/free-solid-svg-icons'

const SideBar =()=>{
    return(
        <div className={classes.wrapper}>
            <div className={classes.sidebar}>
            <h2>FRAS</h2>
            <ul >
          <li><NavLink to="/Recorder"><FontAwesomeIcon icon={faVideo} /> Take Video</NavLink></li>
          <li><NavLink to="/Attendance"><FontAwesomeIcon icon={faCameraRetro} /> Attendance</NavLink></li>
        </ul>
        </div>
        </div>
    )
}

export default SideBar;