import React from 'react';
import Header from '../componets/Header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <h2>Pagina de Album</h2>
      </div>
    );
  }
}

export default Album;
