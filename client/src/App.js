import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logUserOut, setCurrentUser } from "./actions/authAction";
import store from "./store";
import { positions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./App.css";

import Navbar from "./components/layouts/navbar/Navbar";
import Landing from "./components/layouts/landing/Landing";
import Footer from "./components/layouts/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import { clearProfile } from "./actions/profileAction";

if (localStorage.token) {
  // set auth token header auth
  setAuthToken(localStorage.token);
  // decode token and get user info
  const decoded = jwt_decode(localStorage.token);
  // set user and is authenticated
  store.dispatch(setCurrentUser(decoded));
  // check for expired token
  const current_time = Date.now();
  if (decoded.exp < current_time) {
    store.dispatch(logUserOut());
    // clear current profile
    store.dispatch(clearProfile());
    // redirect to login
    window.location.href = "/login";
  }
}
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

class App extends Component {
  render() {
    return (
      <Provider store={store} template={AlertTemplate} {...options}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
