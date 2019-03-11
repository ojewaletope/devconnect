import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import TextField from '../shared/TextField'
import {
  SelectListGroup,
  InputGroup,
  TextAreaGroup,
  TextFieldGroup
} from "../shared/FormFields";

class CreateProfile extends Component {
  state = {
    display_social_input: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    github_username: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {}
  };
  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };
  onChange = e => {
    e.preventDefault();
    console.log("submit");
  };
  render() {
    const { errors, display_social_input } = this.state;
    let socialInputs;
    if (display_social_input) {
      socialInputs = (
        <div>
          <InputGroup
            onChange={this.onChange}
            value={this.state.twitter}
            name="twitter"
            type="text"
            placeholder="Twitter profile link"
          />
          <InputGroup
            onChange={this.onChange}
            value={this.state.facebook}
            name="facebook"
            type="text"
            placeholder="Facebook profile link"
          />
          <InputGroup
            onChange={this.onChange}
            value={this.state.linkedin}
            name="linkedin"
            type="text"
            placeholder="LinkedIn profile link"
          />
        </div>
      );
    }
    const options = [
      { label: "* Select professional status", value: "0" },
      { label: "Junior Developer", value: "Developer" },
      { label: "Intermediate Developer", value: "Developer" },
      { label: "Senior Developer", value: "Developer" },
      { label: "Trainer", value: "Trainer" },
      { label: "Student", value: "Student" }
    ];
    return (
      <div className=" .create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Information to make your profile standout
              </p>
              <small className="d-block pb-3">* required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  onChange={this.onChange}
                  type="text"
                  value={this.state.handle}
                  name="handle"
                  placeholder="* Profile handle"
                  error={errors.handle}
                />
                <SelectListGroup
                  onChange={this.onChange}
                  placeholder="Status"
                  value={this.state.status}
                  name="status"
                  options={options}
                  error={errors.status}
                />
                <TextFieldGroup
                  onChange={this.onChange}
                  type="text"
                  value={this.state.company}
                  name="company"
                  placeholder="Where do you work?"
                  error={errors.company}
                />
                <TextFieldGroup
                  onChange={this.onChange}
                  type="text"
                  value={this.state.location}
                  name="handle"
                  placeholder="Where do you live?"
                  error={errors.location}
                />
                <TextFieldGroup
                  onChange={this.onChange}
                  type="text"
                  value={this.state.skills}
                  name="handle"
                  placeholder="Skills, please use comma separated values"
                  error={errors.skills}
                />
                <TextFieldGroup
                  onChange={this.onChange}
                  type="text"
                  value={this.state.github_username}
                  name="handle"
                  placeholder="Your github username here"
                  error={errors.github_username}
                />
                <TextAreaGroup
                  onChange={this.onChange}
                  value={this.state.bio}
                  name="bio"
                  placeholder="Give us some details about you"
                  error={errors.bio}
                />
                <div className="mb-3">
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      this.setState(prevState => ({
                        display_social_inputs: !prevState.display_social_inputs
                      }));
                    }}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                  {socialInputs}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
