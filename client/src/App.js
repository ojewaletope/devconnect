import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logUserOut, setCurrentUser } from "./actions/authAction";
import store from "./store";
import "./App.css";

import Navbar from "./components/layouts/navbar/Navbar";
import Landing from "./components/layouts/landing/Landing";
import Footer from "./components/layouts/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

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

    // redirect to login
    window.location.href = "/login"
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
