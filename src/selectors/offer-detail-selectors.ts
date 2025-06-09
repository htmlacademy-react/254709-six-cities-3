import { createSelector } from '@reduxjs/toolkit';
import type { OfferDetailStateType } from '../types/offers';

const selectOfferDetailState = (state: { offerDetail: OfferDetailStateType }) => state.offerDetail;

const selectOffer = createSelector(
  [selectOfferDetailState],
  (state) => state.offer
);

const selectNearbyOffers = createSelector(
  [selectOfferDetailState],
  (state) => state.nearbyOffers
);

const selectComments = createSelector(
  [selectOfferDetailState],
  (state) => state.comments
);

const selectStatus = createSelector(
  [selectOfferDetailState],
  (state) => state.status
);

const selectError = createSelector(
  [selectOfferDetailState],
  (state) => state.error
);

const selectFavoriteStatus = createSelector(
  [selectOffer],
  (offer) => offer?.isFavorite
);

export const offerDetailSelectors = {
  selectOffer,
  selectNearbyOffers,
  selectComments,
  selectStatus,
  selectError,
  selectFavoriteStatus,
};
