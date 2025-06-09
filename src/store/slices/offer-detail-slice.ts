import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import type { OfferDetailStateType } from '../../types/offers';

import {
  fetchOfferDetail,
  fetchNearbyOffers,
  fetchComments,
  sendComment,
} from '../thunk/offer-detail-thunk';
import { toggleFavoriteStatus } from '../thunk/offers-thunk';

const initialState: OfferDetailStateType = {
  offer: null,
  nearbyOffers: [],
  comments: [],
  status: RequestStatus.idle,
  error: null,
};

export const offerDetailSlice = createSlice({
  name: 'offerDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferDetail.pending, (state) => {
        state.status = RequestStatus.loading;
        state.error = null;
      })
      .addCase(fetchOfferDetail.fulfilled, (state, action) => {
        state.status = RequestStatus.success;
        state.offer = action.payload;
        state.error = null;
      })
      .addCase(fetchOfferDetail.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message || 'Error loading offer details';
      })
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.error = null;
      })
      .addCase(fetchNearbyOffers.rejected, (state, action) => {
        state.error = action.error.message || 'Error loading nearby offers';
      })
      .addCase(fetchComments.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.error = null;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.error = action.error.message || 'Error loading comments';
      })
      .addCase(sendComment.pending, (state) => {
        state.error = null;
      })
      .addCase(sendComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.error = null;
      })
      .addCase(sendComment.rejected, (state, action) => {
        state.error = action.error.message || 'Comment didnt send';
      })
      .addCase(toggleFavoriteStatus.fulfilled, (state, action) => {
        const offerId = action.meta.arg.offerId;
        if (state.offer?.id === offerId) {
          state.offer.isFavorite = action.payload.isFavorite;
        }
        const offerIndex = state.nearbyOffers.findIndex((item) => item.id === offerId);
        if (offerIndex !== -1) {
          state.nearbyOffers[offerIndex].isFavorite = action.payload.isFavorite;
        }
      });
  },
});

export default offerDetailSlice.reducer;
