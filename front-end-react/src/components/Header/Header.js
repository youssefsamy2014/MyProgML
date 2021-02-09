import React from 'react';
import {NavLink} from'react-router-dom';
import classes from './Header.css'
import { connect } from 'react-redux';


const Header =(props)=>{
    let Navs=(
        <ul >
          <li><NavLink to="/Login">Login</NavLink></li>
          <li><NavLink to="/Registration">Registration</NavLink></li>
        </ul>
    );
    if (props.isAuthenticated) {
        Navs=(
        <ul >
        <li><NavLink to="/Logout">Logout</NavLink></li>
      </ul>)};
    return(
        <div className={classes.container}>
        
        <div className={classes.header}>
            <h2>MACHINE LEARNING</h2>        
        </div>

        <div className={classes.right}>
        {Navs}
        </div>

        </div>
    )
}

const mapStateToProps= state =>{
    return{
      isAuthenticated: state.token !== null,
    };
  };
  export default  connect(mapStateToProps)(Header);
  