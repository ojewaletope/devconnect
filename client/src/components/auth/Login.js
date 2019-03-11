import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import { loginUser } from "../../actions/authAction";
// import {TextFieldGroup} from "../shared/FormFields";
import {TextFieldGroup} from '../shared/FormFields'


class Login extends Component {

  state = {
    email: "",
    password: "",
    errors: {}
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated === true) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated === true) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
    // this.setState({
    //   email: "",
    //   password: "",
    // });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnect account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  onChange={this.onInputChange}
                  type="email"
                  value={this.state.email}
                  name="email"
                  placeholder="Email Address"
                  error={errors.email}
                />
                <TextFieldGroup
                  onChange={this.onInputChange}
                  type="password"
                  value={this.state.password}
                  name="password"
                  placeholder="Password"
                  error={errors.password}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
