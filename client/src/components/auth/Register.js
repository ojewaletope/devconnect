import React, { Component } from "react";
import PropTypes            from 'prop-types';
import {withRouter}         from 'react-router-dom';
import classnames           from "classnames";
import {connect}            from 'react-redux';
import {registerUser}       from '../../actions/authAction'
import TextFieldGroup       from "../shared/TextField";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    errors: {}
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }
  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    this.props.registerUser(newUser, this.props.history);
    console.log(this.state.errors)
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  onChange={this.onInputChange}
                  type="text"
                  value={this.state.email}
                  name="name"
                  placeholder="Name"
                  error={errors.name}
                />
                <TextFieldGroup
                  onChange={this.onInputChange}
                  type="email"
                  value={this.state.email}
                  name="email"
                  info="Provide a gravatar email"
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
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, {registerUser})(withRouter(Register));
