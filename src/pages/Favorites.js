import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import './favorites.css';

// import { Redirect } from 'react-router-dom';

class Favorites extends Component {
  state = {
    getfavorites: [],
    loading: false,
    isChecked: true,
  };

  componentDidMount() {
    this.recoverFavorites();
  }

  recoverFavorites = async () => {
    const favoritedSongs = await getFavoriteSongs();

    this.setState({
      getfavorites: favoritedSongs,
    });
  };

  handleChange = async (song) => {
    this.setState(({
      loading: true,
    }));

    await removeSong(song);

    this.setState(({
      loading: false,
    }));

    this.recoverFavorites();
  };

  render() {
    const { getfavorites, isChecked, loading } = this.state;

    if (loading) return <h4>Carregando...</h4>;

    return (
      <div data-testid="page-favorites">
        <Header />
        <h1 className="favorite-songs-list-container">Músicas Favoritas</h1>
        { !getfavorites
          ? <h4>Você não tem músicas salvas</h4>
          : (
            <div className="favorite-songs-list-container">
              {getfavorites.map((eachMusic, index) => (
                <ul key={ index } >
                  <li>
                    <MusicCard
                      index={ index }
                      song={ eachMusic }
                      handleChange={ this.handleChange }
                      checkedBox={ isChecked }
                    />
                  </li>
                </ul>
              ))}
            </div>
          )}
      </div>
    );
  }
}

export default Favorites;

Favorites.propTypes = {
  favoriteSongs: PropTypes.shape({
  }),
}.isRequired;
