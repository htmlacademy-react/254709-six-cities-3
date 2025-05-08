import { FavoriteCard } from '../favorite-card/favorite-card';
import { OffersType } from '../../mocks/offers';


type FavoriteItemProps = {
  cityName: string;
  offers: OffersType;
};

export const FavoriteItem = ({ cityName, offers }: FavoriteItemProps) => (
  <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link" href="#">
          <span>{cityName}</span>
        </a>
      </div>
    </div>
    <div className="favorites__places">
      {offers.map((offer) => (
        <FavoriteCard
          key={offer.id}
          offer={offer}
        />
      ))}
    </div>
  </li>
);
