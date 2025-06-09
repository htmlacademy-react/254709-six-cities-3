import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { OffersType } from '../../types/offers';
import { Endpoint } from '../../const';
import { OfferType } from '../../types/offers';

export const fetchAllOffers = createAsyncThunk<OffersType, undefined, { extra: AxiosInstance }>('fetchOffers/all', async (_arg, { extra: api }) => {
  try {
    const response = await api.get<OffersType>(Endpoint.Offers);
    return response.data;
  } catch (error) {
    throw new Error('Error Loading All Offers');
  }
});

export const fetchFavoriteOffers = createAsyncThunk<OfferType[], undefined, { extra: AxiosInstance }>(
  'fetchOffers/favorites',
  async (_arg, { extra: api }) => {
    try {
      const response = await api.get<OfferType[]>(Endpoint.Favorite);
      return response.data;
    } catch (error) {
      throw new Error('Error Loading Favorite Offers');
    }
  }
);

export const toggleFavoriteStatus = createAsyncThunk<
  { offer: OfferType; isFavorite: boolean },
  { offerId: string; status: number },
  { extra: AxiosInstance }
>(
  'favorite/toggleStatus',
  async ({ offerId, status }, { extra: api }) => {
    try {
      const response = await api.post<OfferType>(
        `${Endpoint.Favorite}/${offerId}/${status}`
      );
      const updatedOffer = response.data;
      const isFavorite = status === 1;

      return {
        offer: updatedOffer,
        isFavorite,
      };
    } catch (error) {
      throw new Error('Error toggling favorite status');
    }
  }
);
