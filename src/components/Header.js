import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      nome: undefined,
    };
  }// fim do constructor

  componentDidMount() {
    this.mudaEstadoAoPegaNome();
  }

    // inicio de funções
    pegarNome = async () => {
      const nomeRecebido = await getUser()
        .then((resposta) => resposta);
      this.setState({
        nome: nomeRecebido,
        loading: false,
      });
    }

    mudaEstadoAoPegaNome = () => {
      this.setState({
        loading: true,
      }, this.pegarNome);
    }

    // fim de funções
    render() {
      const { nome, loading } = this.state;
      return (
        <header data-testid="header-component">
          <h1>Cabeçalho</h1>
          <nav>
            <ul>
              <li>
                <Link
                  data-testid="link-to-search"
                  to="/search"
                >
                  Pesquisar
                </Link>
              </li>
              <li>
                <Link
                  data-testid="link-to-favorites"
                  to="/favorites"
                >
                  Favoritas
                </Link>
              </li>
              <li>
                <Link
                  data-testid="link-to-profile"
                  to="/profile"
                >
                  Perfil
                </Link>
              </li>
            </ul>
          </nav>
          <section data-testid="header-user-name">
            {loading
              ? <Carregando />
              : <h2>{nome.name }</h2>}
          </section>
        </header>
      );
    }
}

export default Header;
