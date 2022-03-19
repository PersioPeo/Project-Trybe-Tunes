import React from 'react';
import propTypes from 'prop-types';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,

    };
  } // fim do constructor

  // inicio de funções
  /* musicaFavoritas = async () => {
     const musicaFavoritaApi = await getFavoriteSongs();
     musicaFavoritaApi.forEach((element) => {
       // const { trackId } = element;
     });
   } // fim da função musicaFavoritas */

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
                  onChange={ (e) => this.favorita(e, trackId) }
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
