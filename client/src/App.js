import React, { Component }             from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import "./App.css";
import Navbar                           from "./components/layouts/navbar/Navbar";
import Landing                          from "./components/layouts/landing/Landing";
import Footer                           from "./components/layouts/Footer";
import Login                            from "./components/auth/Login";
import Register                         from "./components/auth/Register";

class App extends Component {
  render() {
    return (
     <Router>
       <div className="App">
         <Navbar />
         <Route exact path="/" component={Landing}/>
         <div className="container">
           <Route exact path="/register" component={Register}/>
           <Route exact path="/login" component={Login}/>
         </div>
         <Footer />
       </div>
     </Router>
    );
  }
}

export default App;
