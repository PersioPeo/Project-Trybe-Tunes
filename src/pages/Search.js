import React from 'react';
import Carregando from '../componets/Carregando';
import Header from '../componets/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      botao: true,
      loading: false,
      cantor: '',

    };
  } // fim do constructor

  // inicio de funções
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

  fomrRender = () => {
    const { onInputChange } = this;
    const { botao, cantor } = this.state;
    return (
      <section>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            data-testid="search-artist-input"
            type="text"
            value={cantor}
            name="cantor"
            onChange={onInputChange}
          />
          <input
            data-testid="search-artist-button"
            type="button"
            value="Pesquisar"
            disabled={botao}
          />

        </form>
      </section>

    );
  }// fim do formRender

  // fim das funções
  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h2>Pagina de search</h2>

        {loading ? <Carregando /> : this.fomrRender()}

      </div>
    );
  }
}
// atualizar

export default Search;
