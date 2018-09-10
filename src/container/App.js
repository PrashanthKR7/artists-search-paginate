import React, { Component, Fragment } from 'react';
import './../styles/App.css';
import './../styles/Pagination.css';
import Albums from './../components/Albums';
import TracksModal from './../components/TracksModal';
import Tracks from './../components/Tracks';
import Loading from './../components/Loading';
import {
  pageLimit,
  getArtistsByName,
  applySetError,
  applySetAlbums,
  getAlbums,
  getAlbumTracks,
  applySetTracks,
  applySetArtists
} from './../constants/api';
import Artists from './../components/Artists';

class App extends Component {
  constructor() {
    super();

    this.state = {
      artistSearchTerm: null,
      currentArtists: [],
      currentPage: null,
      totalPages: null,
      totalArtists: null,
      currentAlbums: [],
      currentAlbumPage: null,
      totalAlbums: null,
      isError: false,
      isLoading: false,
      showArtistAlbums: false,
      tracks: [],
      shown: false
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  fetchArtists = (value, page) => {
    fetch(getArtistsByName(value, page))
      .then(response => response.json())
      .then(result => {
        this.setState(applySetArtists(result.results, page));
      })
      .catch(() => {
        this.setState(applySetError);
      });
  };

  fetchAlbums = (value, page) => {
    fetch(getAlbums(value, page))
      .then(response => response.json())
      .then(result => {
        this.setState(applySetAlbums(result.topalbums, page));
      })
      .catch(() => {
        this.setState(applySetError);
      });
  };

  fetchTracks = (artist, album) => {
    fetch(getAlbumTracks(artist, album))
      .then(response => response.json())
      .then(result => {
        this.albumDetails = result.album.wiki;
        this.setState(applySetTracks(result.album.tracks));
      })
      .catch(() => {
        this.setState(applySetError);
      });
  };

  handleUserInput(searchTerm) {
    if (searchTerm === '') {
      return;
    }
    this.setState({
      showArtistAlbums: false,
      isLoading: true,
      totalArtists: null,
      artistSearchTerm: searchTerm
    });
    this.fetchArtists(searchTerm, 1);
  }

  onPageChanged = data => {
    this.setState({
      isLoading: true
    });
    !this.state.showArtistAlbums
      ? this.fetchArtists(this.state.artistSearchTerm, data)
      : this.fetchAlbums(this.artistForAlbumSearch.name, data);
  };

  handleUserClick = data => {
    this.setState({ isLoading: true, showArtistAlbums: true });
    this.artistForAlbumSearch = data;
    this.fetchAlbums(this.artistForAlbumSearch.name, 1);
  };

  handleUserTrackClick = data => {
    this.albumName = data;
    this.fetchTracks(this.artistForAlbumSearch.name, data);
  };

  handleCloseClick = () => {
    const { shown } = this.state;
    this.setState({
      shown: !shown
    });
  };

  renderModal = () => (
    <TracksModal handleClose={this.handleCloseClick}>
      <Tracks
        tracks={this.state.tracks}
        albumName={this.albumName}
        albumDetails={this.albumDetails}
      />
    </TracksModal>
  );
  render() {
    const {
      currentPage,
      currentAlbumPage,
      totalArtists,
      totalAlbums,
      shown
    } = this.state;
    let currentArtists = this.state.currentArtists;
    let currentAlbums = this.state.currentAlbums;

    if (currentAlbums.length && currentAlbums.length > pageLimit) {
      currentAlbums = currentAlbums.slice(pageLimit, pageLimit * 2);
    }

    if (currentArtists.length && currentArtists.length > pageLimit) {
      currentArtists = currentArtists.slice(pageLimit, pageLimit * 2);
    }

    if (this.state.isError) {
      return (
        <h3>
          <center>Error loading page.</center>
        </h3>
      );
    }

    return (
      <Fragment>
        {this.state.isLoading && !totalArtists ? (
          <Loading />
        ) : this.state.showArtistAlbums ? (
          <Albums
            handleBackClick={() => this.setState({ showArtistAlbums: false })}
            artistForAlbumSearch={this.artistForAlbumSearch}
            currentAlbums={currentAlbums}
            totalAlbums={totalAlbums}
            currentAlbumPage={currentAlbumPage}
            pageLimit={pageLimit}
            handleUserClick={this.handleUserTrackClick}
            onPageChanged={this.onPageChanged}
            loading={this.state.isLoading}
          />
        ) : (
          <Artists
            handleBackClick={() => this.setState({ showArtistAlbums: false })}
            handleUserInput={this.handleUserInput}
            artistSearchTerm={this.state.artistSearchTerm}
            currentArtists={currentArtists}
            totalArtists={Number(totalArtists)}
            currentPage={Number(currentPage)}
            pageLimit={pageLimit}
            handleUserClick={this.handleUserClick}
            onPageChanged={this.onPageChanged}
            loading={this.state.isLoading}
          />
        )}
        {shown && this.renderModal()}
      </Fragment>
    );
  }
}

export default App;
