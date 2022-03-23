import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      arrayMusics: [],
      artistName: '',
      albumName: '',
    };
  }// fim do constructor

  componentDidMount() {
    this.pegaMusicaFavorita();
  }

  // inicio das funções
  pegaMusicaFavorita = async () => {
    this.setState(
      { loading: true },
      async () => {
        const favoritas = await getFavoriteSongs();
        this.setState(
          {
            loading: false,
            arrayMusics: favoritas,
          },
        );
      },
    );
  }

  // fim das funções
  render() {
    const { arrayMusics } = this.state;
    console.log(arrayMusics);
    return (
      <div data-testid="page-favorites">
        <Header />
        <h2>Pagina de favorites</h2>
      </div>
    );
  }// fim do render
}// fim da class

export default Favorites;
