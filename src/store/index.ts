import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { createAPI } from '../services/api';
import { RootState, AppDispatch } from '../types/store';
import offersReducer from './slices/offers-slice';
import offerDetailReducer from './slices/offer-detail-slice';
import userReducer from './slices/user-slice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: {extraArgument: createAPI()}}),
  reducer: {
    offers: offersReducer,
    offerDetail: offerDetailReducer,
    user: userReducer,
  }
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
