import { createSelector } from '@reduxjs/toolkit';
import type { OffersStateType } from '../types/offers';
import type { RootState } from '../types/store';

const selectOffersState = (state: { offers: OffersStateType }) => state.offers;

const selectCity = createSelector(
  [selectOffersState],
  (state) => state.city
);

const selectOffers = createSelector(
  [selectOffersState],
  (state) => state.offers
);

const selectStatus = createSelector(
  [selectOffersState],
  (state) => state.status
);

const selectError = createSelector(
  [selectOffersState],
  (state) => state.error
);

const selectFavoriteOffers = createSelector(
  [(state: RootState) => state.offers.favoriteOffers],
  (favoriteOffers) => favoriteOffers
);

const selectFavoriteOffersCount = createSelector(
  [selectFavoriteOffers],
  (favoriteOffers) => favoriteOffers.length
);

export const offersSelectors = {
  selectCity,
  selectOffers,
  selectStatus,
  selectError,
  selectFavoriteOffers,
  selectFavoriteOffersCount,
};
