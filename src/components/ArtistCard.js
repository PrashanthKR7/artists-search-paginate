import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/lib/Media';
import Col from 'react-bootstrap/lib/Col';
import imageSrc from './../assets/images/music_icon.jpg';
class ArtistCard extends Component {
  handleClick = () => {
    this.props.onUserClick(this.props.artist);
  };

  render() {
    return (
      <Col>
        <Media>
          <Media.Left>
            <img
              width={64}
              height={64}
              src={this.props.artist.image[2]['#text']}
              onError={e => {
                e.target.src = imageSrc;
              }}
            />
          </Media.Left>
          <Media.Body>
            <Media.Heading title={this.props.artist.name}>
              {this.props.artist.name}
            </Media.Heading>
            <a href={null} onClick={this.handleClick} className="navbar-link">
              View Albums
            </a>
          </Media.Body>
        </Media>
      </Col>
    );
  }
}

ArtistCard.propTypes = {
  artist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    listeners: PropTypes.string.isRequired,
    streamable: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    mbid: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(
      PropTypes.shape({
        ['#text']: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired
      }).isRequired
    )
  }).isRequired,
  onUserClick: PropTypes.func.isRequired
};

export default ArtistCard;
