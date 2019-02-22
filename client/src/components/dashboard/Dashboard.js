import React, {Component} from 'react';
import PropTypes         from 'prop-types';
import {connect}from 'react-redux'
import {getUserProfile} from '../../actions/profileAction'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }
  render() {
    const {user} = this.props.auth;
    const {profile, loading} = this.props.profile;

    let dashBoardContent;
    if (profile === null || loading) {
      dashBoardContent = <h4>Loading...</h4>
    } else {
      dashBoardContent = <h2>Dashboard</h2>
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">
               Dashboard
              </h1>
              {dashBoardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Dashboard.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, {getUserProfile})(Dashboard)