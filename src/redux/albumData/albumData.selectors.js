import { createSelector } from 'reselect';

const selectAlbum = state => state.albums;

export const selectAlbumSlice = createSelector([selectAlbum], albums => albums.album);
