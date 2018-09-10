import React from 'react';
import './../styles/Tracks.css';
export default props => {
  const formatTime = time => {
    const mm = Math.floor(time / 60);
    const ss = time % 60;
    return (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
  };
  const published = props.albumDetails
    ? props.albumDetails.published.split(',')[0]
    : '';
  return (
    <div className="tracks-container">
      <h5 className="track-header">Track Listing</h5>
      <div className="album-details">
        <h4 className="album-name">{props.albumName}</h4>
        <h4 className="album-release-date">{published}</h4>
      </div>
      <div className="tracks-list">
        {props.tracks.map(track => (
          <div key={track.url || track.name} className="track-details">
            <span className="track-name"> {track.name}</span>
            <span className="track-duration">
              {' '}
              {formatTime(track.duration)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
