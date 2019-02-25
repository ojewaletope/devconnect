import React, { Component } from "react";
import PropTypes            from "prop-types";
import { connect }          from "react-redux";
import { getUserProfile }   from "../../actions/profileAction";
import Spinner              from "../shared/Spinner";
import Link                 from "react-router-dom/es/Link";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashBoardContent;
    if (profile === null || loading) {
      dashBoardContent = <Spinner />;
    } else {
     // check if logged in user has profile
      if (Object.keys(profile) > 0) {
        dashBoardContent = <h4>Display Profile</h4>
      } else {
        // user is logged in but has no profile
        dashBoardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet set up a profile please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile </Link>
          </div>
        )
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashBoardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getUserProfile }
)(Dashboard);
