import Card from '../../components/card/card';
import { OffersType, OfferType } from '../../mocks/offers';

type NearPlacesProps ={
  offers: OffersType;
  onActiveOfferChange: (offer?: OfferType) => void;
}
const NearPlaces = ({offers, onActiveOfferChange}: NearPlacesProps): JSX.Element => (
  <section className="near-places places">
    <h2 className="near-places__title">Other places in the neighbourhood</h2>
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          handleHover={onActiveOfferChange}
        />
      ))}
    </div>
  </section>
);

export default NearPlaces;
