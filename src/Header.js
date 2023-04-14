import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from './services/userAPI';
import './header.css';
// import { Redirect } from 'react-router-dom';

class Header extends Component {
  state = {
    loggedUser: '',
    loading: true,
  };

  componentDidMount() {
    this.accessLoggedUser();
  }

  accessLoggedUser = async () => {
    const { name } = await getUser();

    this.setState({ loading: true });

    this.setState({ loggedUser: name });

    this.setState({ loading: false });

    return name;
  };

  render() {
    const {
      loading,
      loggedUser,
    } = this.state;

    if (loading) return <h1>Carregando...</h1>;

    return (
      <header data-testid="header-component" className="container-header">
        <div className="nav">
          <Link
            to="/"
            data-testid="header-user-name"
            className="greeting"
          >
            { `Olá, ${loggedUser}` }
          </Link>
          <Link to="/search" data-testid="link-to-search" className="a">Pesquisa</Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="a"
          >
            Favoritas
          </Link>
          <Link to="/profile" data-testid="link-to-profile" className="a">Perfil</Link>
          <h5>TRYBEtunes</h5>
        </div>
      </header>
    );
  }
}

export default Header;
