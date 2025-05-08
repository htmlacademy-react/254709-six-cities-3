import NavItem from '../../components/nav-item/nav-item';
import OfferSection from '../../components/offer-section/offer-section';
import { Helmet } from 'react-helmet-async';
import { OffersType } from '../../mocks/offers';

type MainProps = {
  offers: OffersType;
};

const Main = ({ offers }: MainProps): JSX.Element => (
  <div className="page page--gray page--main">
    <Helmet>
      <title>6 cities</title>
    </Helmet>

    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>

      <NavItem />

      <div className="cities">
        <div className="cities__places-container container">

          <OfferSection offers={offers}/>

          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default Main;
