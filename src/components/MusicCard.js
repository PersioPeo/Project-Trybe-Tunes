import React from 'react';
import propTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,

    };
  } // fim do constructor

  // inicio de funções
  favoritarMusicas = async (event, id) => {
    const { checked } = event.target;
    const { listaDeMusica } = this.props;
    const musicSelec = listaDeMusica.find((item) => item.trackId === id);
    this.setState({ loading: true });
    if (checked) {
      await addSong(musicSelec);
    } else {
      await removeSong(musicSelec);
    }
    this.setState({ loading: false });
  }
  // fim de funções

  render() {
    const { listaDeMusica, cantor, nomeDoAlbum } = this.props;
    const { loading } = this.state;

    return (
      <section>
        <div>
          <h1 data-testid="album-name">
            {' '}
            Collection Name
            {nomeDoAlbum}
          </h1>
          <h2 data-testid="artist-name">
            Artist Name
            {' '}
            {cantor}
          </h2>
        </div>
        <ul>
          {listaDeMusica.map(({ trackName, previewUrl, trackId }, index) => (
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
  listaDeMusica: propTypes.string,
  cantor: propTypes.string,
  albumName: propTypes.string,
  music: propTypes.objectOf(propTypes.any),
}.isRequired;

export default MusicCard;
