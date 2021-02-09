import React from 'react';// eslint-disable-next-line
import { Route,
  HashRouter,
  Redirect,
  Switch
} from "react-router-dom";
import Registration from '../Registration/Registration'
import Login from '../Login/Login';
import SideBar from '../../components/SideBar/SideBar';
import Recorder from '../Recorder/Recorder';
import Attendance from '../Attendance/Attendance';
import Header from '../../components/Header/Header'
import Logout from '../Login/Logout/Logout'
import { connect } from 'react-redux';


const HomePage =(props)=> {
  
  let routes = (
    <Switch>
<Route exact  path="/Login" component={Login}/>
            <Route path="/Registration" component={Registration}/>
            <Redirect to="/" />    
            </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
                <Route exact  path="/Login" component={Login}/>
                <Route path="/Registration" component={Registration}/>
                <Route path="/Attendance" component={Attendance}/>
                <Route path="/Recorder" component={Recorder}/>
                <Route path="/logout" component={Logout} />
                <Redirect to="/" />
      </Switch>
    );
  }
  
  
  return (
    
    <HashRouter>
      <SideBar/>
      <Header/>
      <div>
            {routes}
      </div>
    </HashRouter>
    
  );
}

const mapStateToProps= state =>{
  return{
    isAuthenticated: state.token !== null,
  };
};
export default  connect(mapStateToProps)(HomePage);
