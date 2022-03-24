import React from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
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
  passaParaMusicCard = () => {
    const { arrayMusics, artistName, albumName } = this.state;
    return (
      <MusicCard
        favorites
        arrayMusics={ arrayMusics }
        artistName={ artistName }
        albumName={ albumName }
      />
    );
  }

  renderTela = () => {
    const { loading } = this.state;
    return (
      <div>
        {loading ? <Carregando /> : this.passaParaMusicCard()}
      </div>
    );
  }

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
    return (
      <div data-testid="page-favorites">
        <Header />
        <h2>Pagina de favorites</h2>
        {this.renderTela()}
      </div>
    );
  }// fim do render
}// fim da class

export default Favorites;
