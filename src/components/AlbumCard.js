import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/lib/Media';
import Col from 'react-bootstrap/lib/Col';

class AlbumCard extends Component {
  handleClick = () => {
    this.props.onUserClick(this.props.album.name);
  };

  render() {
    return (
      <Col>
        <Media>
          <Media.Left>
            <img
              width={64}
              height={64}
              src={this.props.album.image[2]['#text']}
              alt="thumb"
            />
          </Media.Left>
          <Media.Body>
            <Media.Heading title={this.props.album.name}>
              {this.props.album.name}
            </Media.Heading>
            <a
              href={null}
              onClick={this.handleClick}
              className="navbar-link"
            >
              View Tracks
            </a>
          </Media.Body>
        </Media>
      </Col>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    name: PropTypes.string.isRequired,
    playcount: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    mbid: PropTypes.string,
    image: PropTypes.arrayOf(
      PropTypes.shape({
        ['#text']: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired
      }).isRequired
    )
  }).isRequired,
  onUserClick: PropTypes.func.isRequired
};

export default AlbumCard;
