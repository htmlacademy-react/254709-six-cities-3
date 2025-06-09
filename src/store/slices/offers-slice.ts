import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cities } from '../../const';
import { RequestStatus } from '../../const';
import type { OffersStateType, OffersType } from '../../types/offers';
import { fetchAllOffers, fetchFavoriteOffers } from '../thunk/offers-thunk';
import { toggleFavoriteStatus } from '../thunk/offers-thunk';

const initialState: OffersStateType = {
  city: Cities[0],
  offers: [],
  favoriteOffers: [],
  status: RequestStatus.idle,
  error: null,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<(typeof Cities)[number]>) => {
      state.city = action.payload;
    },
    initOffers: (state, action: PayloadAction<OffersType>) => {
      state.offers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOffers.pending, (state) => {
        state.status = RequestStatus.loading;
        state.error = null;
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.success;
        state.offers = action.payload;
        state.error = null;
      })
      .addCase(fetchAllOffers.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message || 'Loading error';
      })
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.status = RequestStatus.loading;
        state.error = null;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.success;
        state.favoriteOffers = action.payload;
        state.error = null;
      })
      .addCase(fetchFavoriteOffers.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message || 'Loading favorite offers error';
      })
      .addCase(toggleFavoriteStatus.fulfilled, (state, action) => {
        const { offer, isFavorite } = action.payload;
        const offerIndex = state.offers.findIndex((item) => item.id === offer.id);
        if (offerIndex !== -1) {
          state.offers[offerIndex] = { ...state.offers[offerIndex], isFavorite };
        }
        if (isFavorite) {
          state.favoriteOffers.push({ ...state.offers[offerIndex], isFavorite: true });
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((item) => item.id !== offer.id);
        }
      })
      .addCase(toggleFavoriteStatus.rejected, (state, action) => {
        state.error = action.error.message || 'Error toggle favorite status';
      });
  },
});

export const { setCity, initOffers } = offersSlice.actions;

export default offersSlice.reducer;
