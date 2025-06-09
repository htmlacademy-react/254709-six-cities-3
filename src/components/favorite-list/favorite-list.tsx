import { FavoriteItem } from '../favorite-item/favorite-item';
import { useAppSelector } from '../../store';
import { offersSelectors } from '../../selectors/offers-selectors';
import type { OffersType } from '../../types/offers';
import { useMemo } from 'react';

type OffersByCityType = {
  [city: string]: OffersType;
};

export const FavoriteList = (): JSX.Element => {
  const favoriteOffers = useAppSelector(offersSelectors.selectFavoriteOffers);

  const offersByCity: OffersByCityType = useMemo(() =>
    favoriteOffers.reduce((acc, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    }, {} as OffersByCityType), [favoriteOffers]
  );

  const cities = useMemo(() => Object.keys(offersByCity), [offersByCity]);

  const favoriteItems = useMemo(() =>
    cities.map((cityName) => (
      <FavoriteItem
        key={cityName}
        cityName={cityName}
        offers={offersByCity[cityName]}
      />
    )), [cities, offersByCity]
  );

  return (
    <ul className="favorites__list">
      {favoriteItems}
    </ul>
  );
};
