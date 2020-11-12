import { createSelector } from 'reselect';

const selectAlbumMeta = state => state.albumMetaData;

export const selectAlbumMetaSlice = createSelector([selectAlbumMeta], albumMetaData => albumMetaData.albumMeta);
