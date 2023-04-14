import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../musicCard.css';
import Heart from 'react-heart';
// import { Redirect } from 'react-router-dom';

class MusicCard extends Component {
  render() {
    const { song, handleChange, checkedBox } = this.props;

    return (
      <div className="songList-container">
        <h3 className="song-name">
          { song.trackName }
        </h3>
        <div className="play-container">
          <audio
            className="play"
            data-testid="audio-component"
            src={ song.previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label
            className="heart-input"
            htmlFor={ song.trackId }
            data-testid={ `checkbox-music-${song.trackId}` }
          >
            <Heart
              isActive={ checkedBox }
              onClick={ () => handleChange(song) }
              inactiveColor="#490733"
              animationTrigger="both"
              activeColor="#490733"
              style={ { marginTop: '0.1rem' } }
            />
            {/* <input
              className="checkbox-input"
              id={ song.trackId }
              type="checkbox"
              // name="favoritos"
              // value={ favoritos }
              onChange={ () => handleChange(song) }
              checked={ checkedBox }
            /> */}
          </label>
        </div>

      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  song: PropTypes.shape({
  }),
  handleChange: PropTypes.func,
  checked: PropTypes.func,
}.isRequired;
