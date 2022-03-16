import React from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from '../componets/Carregando';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      botao: true,
      loading: false,
      redireciona: null,
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState(
      { [name]: value },
      () => this.validaTamanho(),
    );
  }

  validaTamanho = () => {
    const tamanhoMin = 3;
    const { login } = this.state;
    const maiorQue3 = login.length >= tamanhoMin;
    this.setState(
      maiorQue3
        ? { botao: false }
        : { botao: true },

    );
  }

  creatUserLoading = async (user) => {
    this.setState(
      { loading: true },
      async () => {
        await createUser(user);
        this.setState({
          loading: false,
          redireciona: '/search',
        });
      },
    );
  }

  formRender = () => {
    const { login, botao } = this.state;
    const { onInputChange, creatUserLoading } = this;
    return (
      <div data-testid="page-login">
        <h2>Pagina de Login</h2>
        <section>
          <form onSubmit={ (e) => e.preventDefault() }>
            <input
              data-testid="login-name-input"
              type="text"
              value={ login }
              name="login"
              onChange={ onInputChange }
            />
            <input
              data-testid="login-submit-button"
              type="submit"
              value="Entrar"
              disabled={ botao }
              onClick={ () => creatUserLoading({ name: login }) }
            />
          </form>
        </section>
      </div>
    );
  }

  render() {
    const { loading, redireciona } = this.state;
    return (
      <main>
        {loading ? <Carregando /> : this.formRender()}
        {redireciona && <Redirect to={ redireciona } />}
      </main>
    );
  }
}

export default Login;
