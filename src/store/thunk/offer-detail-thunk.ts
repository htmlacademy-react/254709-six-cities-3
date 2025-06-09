import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  OfferDetailType,
  OffersType,
  CommentsType,
} from '../../types/offers';
import { Endpoint } from '../../const';
import { Comment } from '../../types/offers';

export const fetchOfferDetail = createAsyncThunk<
  OfferDetailType,
  string,
  { extra: AxiosInstance }
>('offerDetail/fetchOfferDetail', async (offerId, { extra: api }) => {
  try {
    const response = await api.get<OfferDetailType>(
      `${Endpoint.Offers}/${offerId}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Error loading offer details');
  }
});

export const fetchNearbyOffers = createAsyncThunk<
  OffersType,
  string,
  { extra: AxiosInstance }
>('offerDetail/fetchNearbyOffers', async (offerId, { extra: api }) => {
  try {
    const response = await api.get<OffersType>(
      `${Endpoint.Offers}/${offerId}/nearby`
    );
    return response.data;
  } catch (error) {
    throw new Error('Error loading nearby offers');
  }
});

export const fetchComments = createAsyncThunk<
  CommentsType,
  string,
  { extra: AxiosInstance }
>('offerDetail/fetchComments', async (offerId, { extra: api }) => {
  try {
    const response = await api.get<CommentsType>(
      `${Endpoint.Comments}/${offerId}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Error loading comments');
  }
});


export const sendComment = createAsyncThunk<
  Comment,
  { offerId: string; review: { comment: string; rating: number } },
  { extra: AxiosInstance; rejectValue: string }
>('offerDetail/postComment', async ({ offerId, review }, { extra: api, rejectWithValue }) => {
  try {
    const response = await api.post<Comment>(
      `${Endpoint.Comments}/${offerId}`,
      review
    );
    return response.data;
  } catch (error) {
    return rejectWithValue('Error posting comment');
  }
});
