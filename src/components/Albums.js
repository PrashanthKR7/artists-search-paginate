import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Pagination from 'react-js-pagination';
import Row from 'react-bootstrap/lib/Row';
import AlbumCard from './AlbumCard';
import Media from 'react-bootstrap/lib/Media';
import Col from 'react-bootstrap/lib/Col';
import Loading from './Loading';
import GoBack from './GoBack';
import { PropTypes } from 'prop-types';

const Albums = props => {
  return (
    <Grid className="album-container">
      <Row>
        <Col md={3} xs={2} />
        <Col md={4} xs={4}>
          <GoBack handleBackClick={props.handleBackClick} />
        </Col>
      </Row>
      <center>
        <Col xs={8} md={5}>
          <Media className="artist-full-card">
            <Media.Left>
              <img
                width={80}
                height={80}
                src={props.artistForAlbumSearch.image[3]['#text']}
                alt="thumbnail"
              />
            </Media.Left>
            <Media.Body>
              <Media.Heading title={props.artistForAlbumSearch.name}>
                {props.artistForAlbumSearch.name}
              </Media.Heading>
              <p>
                Listeners:
                {' ' + props.artistForAlbumSearch.listeners}
              </p>
            </Media.Body>
          </Media>
        </Col>
        <h4 class="album-header">Albums</h4>
      </center>

      <Row className="artist-container">
        {props.loading ? (
          <Loading />
        ) : (
          props.currentAlbums.map(album => (
            <AlbumCard
              key={album.mbid || album.name}
              album={album}
              onUserClick={props.handleUserClick}
            />
          ))
        )}
      </Row>
      <center>
        {Number(props.totalAlbums) === 0 ? null : (
          <Pagination
            activePage={Number(props.currentAlbumPage)}
            activeClass="active"
            itemsCountPerPage={props.pageLimit}
            totalItemsCount={Number(props.totalAlbums)}
            pageRangeDisplayed={5}
            onChange={props.onPageChanged}
          />
        )}
      </center>
    </Grid>
  );
};

export default Albums;

Albums.propTypes = {
  handleBackClick: PropTypes.func.isRequired,
  artistForAlbumSearch: PropTypes.object.isRequired,
  currentAlbums: PropTypes.array,
  totalAlbums: PropTypes.string,
  currentAlbumPage: PropTypes.string,
  pageLimit: PropTypes.number.isRequired,
  handleUserClick: PropTypes.func.isRequired,
  onPageChanged: PropTypes.func.isRequired,
  loading: PropTypes.any
};
