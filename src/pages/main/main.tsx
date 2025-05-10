import NavItem from '../../components/nav-item/nav-item';
import Map from '../../components/map/map';
import OfferSection from '../../components/offer-section/offer-section';
import { Helmet } from 'react-helmet-async';
import { OffersType } from '../../mocks/offers';
import { useState } from 'react';
import { Nullable } from 'vitest';
import { OfferType } from '../../mocks/offers';

type MainProps = {
  offers: OffersType;
};

const Main = ({ offers }: MainProps): JSX.Element => {
  const [activeOffer, setActiveOffer] = useState<Nullable<OfferType>>(null);

  const handleActiveOfferChange = (offer?: OfferType) => {
    setActiveOffer(offer || null);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <NavItem />

        <div className="cities">
          <div className="cities__places-container container">
            <OfferSection
              offers={offers}
              onActiveOfferChange={handleActiveOfferChange}
            />

            <div className="cities__right-section">
              <div className="cities__right-section">
                <Map
                  className="cities__map"
                  offers={offers}
                  activeOffer={activeOffer}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
