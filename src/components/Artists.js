import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import SearchBar from './SearchBar';
import ArtistCard from './ArtistCard';
import Pagination from 'react-js-pagination';
import Row from 'react-bootstrap/lib/Row';
import Loading from './Loading';
import GoBack from './GoBack';
import { PropTypes } from 'prop-types';

const Artists = props => {
  return props.totalArtists === 0 && props.artistSearchTerm ? (
    <Grid>
      <center>
        <h4>No artists available for the searched name.</h4>
        <GoBack handleBackClick={props.handleBackClick} />
      </center>
    </Grid>
  ) : (
    <Grid>
      <center>
        <SearchBar
          onUserInput={props.handleUserInput}
          filterText={props.artistSearchTerm}
          placeholder={'Search by artist name'}
        />
      </center>

      <Row className="artist-container">
        {props.loading ? (
          <Loading />
        ) : (
          props.currentArtists.map(artist => (
            <ArtistCard
              key={artist.mbid || artist.name}
              artist={artist}
              onUserClick={props.handleUserClick}
            />
          ))
        )}
      </Row>
      <center>
        {props.totalArtists ? (
          <Pagination
            activePage={props.currentPage}
            activeClass="active"
            itemsCountPerPage={props.pageLimit}
            totalItemsCount={props.totalArtists}
            pageRangeDisplayed={5}
            onChange={props.onPageChanged}
          />
        ) : null}
      </center>
    </Grid>
  );
};

export default Artists;

Artists.propTypes = {
  handleUserInput: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func.isRequired,
  artistSearchTerm: PropTypes.string,
  currentArtists: PropTypes.array,
  totalArtists: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageLimit: PropTypes.number.isRequired,
  handleUserClick: PropTypes.func.isRequired,
  onPageChanged: PropTypes.func.isRequired,
  loading: PropTypes.any
};
