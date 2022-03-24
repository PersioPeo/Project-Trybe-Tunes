import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      arrayDeUsuario: undefined,
    };
  }// fim do constructor

  componentDidMount() {
    this.pegarUsuario();
  }

  // inicio das funções
  pegarUsuario = async () => {
    this.setState(
      { loading: true },
      async () => {
        const usuarios = await getUser();
        this.setState({
          loading: false,
          arrayDeUsuario: usuarios,
        });
      },
    );
  }

  // fim das funções

  render() {
    const { loading, arrayDeUsuario } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h2>Pagina de profile</h2>
        { loading
          ? <Carregando />
          : (
            <div>
              <p>{`${arrayDeUsuario.name}` }</p>
              <p>{`${arrayDeUsuario.email}`}</p>
              <p>{`${arrayDeUsuario.description}`}</p>
              <img
                data-testid="profile-image"
                src={ arrayDeUsuario.image }
                alt=""
              />
              <br />
              <Link to="/profile/edit">
                Editar perfil
              </Link>
            </div>
          ) }
      </div>
    );
  }
}

export default Profile;
