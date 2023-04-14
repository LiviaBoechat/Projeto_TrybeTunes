import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';
import Header from '../Header';
import '../album.css';

// import { Redirect } from 'react-router-dom';

class Album extends Component {
  state = {
    songList: [],
    artistName: '',
    collectionName: '',
    collectionImage: [],
    loading: false,
    idFavorites: [],
  };

  async componentDidMount() {
    this.getMusics();
    this.recoverFavorites();
    // console.log('teste');
  }

  recoverFavorites = async () => {
    const getfavorites = await getFavoriteSongs();
    console.log(getfavorites);
    const arrayId = getfavorites.reduce(((acc, curr) => {
      acc.push(curr.trackId);
      return acc;
    }), []);
    this.setState({
      idFavorites: arrayId,
    });
  };

  handleChange = async (song) => {
    const { idFavorites } = this.state;

    this.setState(({
      loading: true,
    }));

    if (!idFavorites.includes(song.trackId)) {
      await addSong(song);
    } else {
      await removeSong(song);
    }
    this.setState(({
      loading: false,
    }));

    this.recoverFavorites();
  };

  getMusics = async () => {
    const { match: { params: { id } } } = this.props;

    const music = await getMusics(id);
    // console.log(musics);

    this.setState(({
      songList: music,
      artistName: music[0].artistName,
      collectionName: music[0].collectionName,
      collectionImage: music[0].artworkUrl100,
    }));
  };

  render() {
    const { songList, artistName,
      collectionName, loading, idFavorites, collectionImage } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <h1 className="loading">Carregando...</h1> : (
          <div className="album-container">
            <div className="album-info-ball">
              <div className="album-image-container">
                <img
                  className="album-image"
                  src={ collectionImage }
                  alt="album"
                />
              </div>
              <div className="album-name-container">
                <h6>Álbum</h6>
                <h4 data-testid="album-name">{ collectionName }</h4>
                <h5 data-testid="artist-name">{ artistName }</h5>
              </div>

            </div>
            <div className="songs-list-container">
              {songList.map((eachMusic, index) => {
                if (index === 0) {
                  return undefined;
                }
                return (
                  <ul key={ index }>
                    <li>
                      <MusicCard
                        index={ index }
                        song={ eachMusic }
                        handleChange={ this.handleChange }
                        checkedBox={ idFavorites.includes(eachMusic.trackId) }
                      />
                    </li>
                  </ul>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  searchSongListMusic: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
