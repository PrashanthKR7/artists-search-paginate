const API_KEY = '7ee7b37a6e94085c7e90131a0f657365';

export const pageLimit = 5;

export const getArtistsByName = (value, page) =>
  `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${value}&api_key=${API_KEY}&page=${page}&format=json&limit=${pageLimit}`;

export const getAlbums = (value, page) =>
  `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${value}&api_key=${API_KEY}&page=${page}&limit=${pageLimit}&format=json`;

export const getAlbumTracks = (artist, album) =>
  `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${album}&format=json`;

export const applySetAlbums = result => ({
  currentAlbums: result.album,
  currentAlbumPage: result['@attr'].page,
  totalAlbums: result['@attr'].total,
  isError: false,
  isLoading: false
});

export const applySetArtists = result => ({
  currentArtists: result.artistmatches.artist,
  currentPage: result['opensearch:Query'].startPage,
  totalArtists: result['opensearch:totalResults'],
  isError: false,
  isLoading: false
});

export const applySetTracks = result => ({
  tracks: result.track,
  shown: true
});

export const applySetError = () => ({
  isError: true,
  isLoading: false
});
