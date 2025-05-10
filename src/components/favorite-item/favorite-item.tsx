import { OffersType } from '../../mocks/offers';
import Card from '../card/card';


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
        <Card
          key={offer.id}
          offer={offer}
          isFavoritePage
        />
      ))}
    </div>
  </li>
);
