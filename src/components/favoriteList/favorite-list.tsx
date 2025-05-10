import { FavoriteItem } from '../favorite-item/favorite-item';
import { OffersType } from '../../mocks/offers';

type FavoriteListProps = {
  favoriteOffers: OffersType;
};

type OffersByCityType = {
  [city: string]: OffersType;
};

export const FavoriteList = ({ favoriteOffers }: FavoriteListProps): JSX.Element => {
  const offersByCity: OffersByCityType =
    favoriteOffers.reduce((acc, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    }, {} as OffersByCityType);

  const cities = Object.keys(offersByCity);
  return (
    <ul className="favorites__list">
      {cities.map((cityName) => (
        <FavoriteItem
          key={cityName}
          cityName={cityName}
          offers={offersByCity[cityName]}
        />
      ))}
    </ul>
  );
};
