import React from 'react';
import propTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    const { arrayMusics } = this.props;
    this.state = {
      loading: false,
      arrayFavorita: arrayMusics,

    };
  } // fim do constructor

  componentDidMount() {
    this.pegarMusicasFavoritas();
  }
  // inicio de funções

  pegarMusicasFavoritas = async () => {
    const favoritas = await getFavoriteSongs();
    favoritas.forEach((element) => {
      const { trackId } = element;
      const musica = document.getElementById(`checkbox-music-${trackId}`);
      if (musica) {
        musica.checked = true;
      }
    });
  }

  favoritarMusicas = async (event, trackId) => {
    const { checked } = event.target;
    const { arrayFavorita } = this.state;
    const { favorites } = this.props;
    const musicSelec = arrayFavorita.find((item) => item.trackId === trackId);
    const novaMusicSelec = arrayFavorita.filter((item) => item.trackId !== trackId);
    this.setState({ loading: true });
    if (checked) {
      await addSong(musicSelec);
    } else if (favorites) {
      await removeSong(musicSelec);
      this.setState({ arrayFavorita: novaMusicSelec });
    } else {
      await removeSong(musicSelec);
    }
    this.setState({ loading: false });
  }
  // fim de funções

  render() {
    const { artistName, albumName } = this.props;
    const { loading, arrayFavorita } = this.state;

    return (
      <section>
        <div>
          <h1 data-testid="album-name">
            {' '}
            Collection Name
            {albumName}
          </h1>
          <h2 data-testid="artist-name">
            Artist Name
            {' '}
            {artistName}
          </h2>
        </div>
        <ul>
          {arrayFavorita.map(({ trackName, previewUrl, trackId }, index) => (
            <li key={ index }>
              <h4 data-testid="music-name">{trackName}</h4>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ `checkbox-music-${trackId}` }>
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  id={ `checkbox-music-${trackId}` }
                  onChange={ (e) => this.favoritarMusicas(e, trackId) }
                />
              </label>
            </li>
          ))}
          {loading && <Carregando />}
        </ul>
      </section>
    );
  }
}// fim de class

MusicCard.propTypes = {
  arrayFavorita: propTypes.string,
  artistName: propTypes.string,
  albumName: propTypes.string,
  music: propTypes.objectOf(propTypes.any),
}.isRequired;

export default MusicCard;
