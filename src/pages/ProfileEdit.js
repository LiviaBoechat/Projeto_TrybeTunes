import React, { Component } from 'react';
import Header from '../Header';
// import { Redirect } from 'react-router-dom';

class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <h1>Profile Edit</h1>
        <Header />
      </div>
    );
  }
}

export default ProfileEdit;
