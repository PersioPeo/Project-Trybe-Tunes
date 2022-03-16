import React from 'react';
import Header from '../componets/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <h2>Pagina de profile</h2>
      </div>
    );
  }
}

export default Profile;
