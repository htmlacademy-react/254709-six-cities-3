import { AppDispatch } from './types/store';
import { toggleFavoriteStatus } from './store/thunk/offers-thunk';

export const calculateRating = (rating: number): string => {
  const percentage = Math.round(rating) / 5 * 100;
  return `${percentage}%`;
};

export const getHumanDate = (isoDate: string) => {
  const date = new Date(isoDate);

  const dateTime = date.toISOString().split('T')[0];

  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const monthYear = `${month} ${year}`;

  return {
    dateTime,
    monthYear,
  };
};

export const toggleFavorite = async (
  dispatch: AppDispatch,
  id: string,
  isFavorite: boolean
) => {
  if (!id) {
    return;
  }

  const isFavoriteStatus = isFavorite ? 0 : 1;
  await dispatch(
    toggleFavoriteStatus({
      offerId: id,
      status: isFavoriteStatus,
    })
  );
};
