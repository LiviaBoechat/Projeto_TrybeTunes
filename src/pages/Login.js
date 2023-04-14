import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import '../login.css';
// import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.validateButton = this.validateButton.bind(this);
    this.enterButtonClick = this.enterButtonClick.bind(this);

    this.state = {
      userName: '',
      isEnterButtonDisabled: true,
      loading: false,
    };
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(({
      [name]: value,
    }), () => this.validateButton());
  }

  validateButton() {
    const { userName } = this.state;
    const minLetters = 3;

    this.setState({
      isEnterButtonDisabled: userName.length < minLetters,
    });
  }

  async enterButtonClick() {
    const { userName } = this.state;
    const { history } = this.props;

    this.setState({ loading: true });

    await createUser({ name: userName });

    this.setState({ loading: false });

    history.push('/search');
  }

  render() {
    const {
      userName,
      isEnterButtonDisabled,
      loading,
    } = this.state;

    if (loading) return <h1>Carregando...</h1>;

    return (
      <div data-testid="page-login" className="container">
        <form className="content">
          <h1>TRYBEtunes</h1>
          <div className="login">
            <label htmlFor="name">
              <input
                className="input"
                data-testid="login-name-input"
                id="name"
                type="text"
                name="userName"
                value={ userName }
                onChange={ this.handleChange }
                placeholder="digite seu nome"
              />
            </label>
            <button
              className="button"
              data-testid="login-submit-button"
              type="button"
              name="isEnterButtonDisabled"
              value={ isEnterButtonDisabled }
              onClick={ this.enterButtonClick }
              disabled={ isEnterButtonDisabled }
            >
              Entrar
            </button>
          </div>

        </form>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
