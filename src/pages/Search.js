import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../componets/Carregando';
import Header from '../componets/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      botao: true,
      loading: false,
      cantor: '',
      resultadoDeAlbuns: [],
      artistaProcurado: '',
      final: false,
    };
  } // fim do constructor

  // inicio de funções
  onSaveButtonClick = () => this.setState((prevState) => ({ cantor: prevState.cantor }));

  onInputChange = ({ target }) => {
    const { name } = target;
    const { value } = target;

    this.setState(
      { [name]: value },
      () => this.validaTamanho(),
    );
  }

  validaTamanho = () => {
    const tamanhoMin = 2;
    const { cantor } = this.state;
    const maiorQue2 = cantor.length >= tamanhoMin;
    this.setState(
      maiorQue2
        ? { botao: false }
        : { botao: true },

    );
  }

  buscarAlbum = async (artista) => {
    const listaDeAlbum = await searchAlbumsAPI(artista);
    this.setState(
      {
        loading: true,
      },
      async () => {
        this.setState({
          loading: false,
          resultadoDeAlbuns: listaDeAlbum,
          cantor: '',
          artistaProcurado: artista,
          final: true,
        });
      },
    );
  }// fim de buscar buscarAlbum

  linkAlbum = () => {
    const { resultadoDeAlbuns, artistaProcurado } = this.state;
    return (
      <div>
        Resultado de álbuns de:
        {' '}
        {artistaProcurado}
        <ul>
          {resultadoDeAlbuns.map(({ collectionName, collectionId }, index) => (
            <li key={ index }>
              <Link
                data-testid={ `link-to-album-${collectionId}` }
                to={ `/album/${collectionId}` }
              >
                {collectionName}
              </Link>
            </li>))}
        </ul>
      </div>
    );
  } // fim da função linkAlbum

  respAlbum = () => {
    const { resultadoDeAlbuns } = this.state;
    const resultDeAlbuns = resultadoDeAlbuns.length !== 0;
    if (resultDeAlbuns) {
      return (this.linkAlbum());
    }
    return (
      <span>Nenhum álbum foi encontrado</span>
    );
  }

  fomrRender = () => {
    const { onInputChange, buscarAlbum } = this;
    const { botao, cantor } = this.state;
    return (
      <section>
        <form onSubmit={ (e) => e.preventDefault() }>
          <input
            data-testid="search-artist-input"
            type="text"
            value={ cantor }
            name="cantor"
            onChange={ onInputChange }
          />
          <input
            data-testid="search-artist-button"
            type="button"
            value="Pesquisar"
            disabled={ botao }
            onClick={ () => buscarAlbum(cantor) }
          />

        </form>
      </section>

    );
  }// fim do formRender

  // fim das funções
  render() {
    const { loading, final } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h2>Pagina de search</h2>

        {loading ? <Carregando /> : this.fomrRender()}
        {final && this.respAlbum()}
      </div>
    );
  }
}
// atualizar

export default Search;
