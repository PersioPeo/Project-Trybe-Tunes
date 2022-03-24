import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Carregando from '../components/Carregando';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      artistName: '',
      albumName: '',
      arrayMusics: [],
    };
  }// fim do constructor

  componentDidMount() {
    this.requisitaMusica();
  }
  // inicio das funções

  requisitaMusica = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState(
      { loading: true },
      async () => {
        const pegaMusicas = await getMusics(id);
        const musicasOk = pegaMusicas.filter((item, index) => index !== 0);
        this.setState(
          {
            loading: false,
            arrayMusics: musicasOk,
            artistName: musicasOk[0].artistName,
            albumName: musicasOk[0].albumName,
          },
        );
      },
    );
  } // fim requisitaMusica

  passarParaMusicCard = () => {
    const { arrayMusics, artistName, albumName } = this.state;
    return (
      <div>
        <MusicCard
          arrayMusics={ arrayMusics }
          artistName={ artistName }
          albumName={ albumName }
        />
      </div>
    );
  }

  // fim das funções
  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2>Pagina de Album</h2>
        {loading ? <Carregando /> : this.passarParaMusicCard()}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }),
}.isRequired;

export default Album;
