import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar';
import ProjectBoard from './components/ProjectBoard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddProjectTask from './components/ProjectTask/AddProjectTask';
import {Provider} from "react-redux"
import store from "./Store"
import UpdateProjectTask from './components/ProjectTask/UpdateProjectTask';
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./SecurityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./SecurityUtils/SecuredRoute";
import Header from "./components/Layout/Header";
import Landing from "./components/Layout/Landing";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

//Ten plik określa co jest renderowane w naszej aplikacji react.
//Jest to plik pośredni, między index.html, a index.js
//W tym pliku określamy co zostanie wyświetlone dla użytkownika
class App extends Component{
  render() {
    return (
      <Provider store={store}> 
        <Router>
          <div className="App">
            {//<Navbar/>
            //<Route exact path='/' component={ProjectBoard} />
            //<Route exact path='/AddProjectTask' component={AddProjectTask} />
            //<Route exact path="/UpdateProjectTask/:pt_id"
              //component={UpdateProjectTask} />
            }
            <Header />
            {
              //Public Routes
            }

            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {
              //Private Routes
            }
            <Switch>
              
              <SecuredRoute
                exact
                path="/projectBoard"
                component={ProjectBoard}
              />
              <SecuredRoute
                exact
                path="/addProjectTask"
                component={AddProjectTask}
              />
              <SecuredRoute
                exact
                path="/updateProjectTask/:pt_id"
                component={UpdateProjectTask}
              />
            </Switch>

          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
