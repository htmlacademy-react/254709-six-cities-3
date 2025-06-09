import NavItem from '../../components/nav-item/nav-item';
import Map from '../../components/map/map';
import OfferSection from '../../components/offer-section/offer-section';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../store';
import { useState, useCallback, useMemo, memo } from 'react';
import { Nullable } from 'vitest';
import type { OfferType } from '../../types/offers';
import { offersSelectors } from '../../selectors/offers-selectors';
import { RequestStatus } from '../../const';
import Spinner from '../../components/spinner/spinner';
import { MainEmpty } from '../../components/main-empty/main-empty';
import cn from 'classnames';

const Main = memo((): JSX.Element => {
  const [activeOffer, setActiveOffer] = useState<Nullable<OfferType>>(null);

  const handleActiveOfferChange = useCallback((offer?: OfferType) => {
    setActiveOffer(offer || null);
  }, []);

  const status = useAppSelector(offersSelectors.selectStatus);
  const activeCity = useAppSelector(offersSelectors.selectCity);
  const allOffers = useAppSelector(offersSelectors.selectOffers);

  const activeOffers = useMemo(
    () => allOffers.filter((offer) => offer.city.name === activeCity),
    [allOffers, activeCity]
  );

  const isLoading = status === RequestStatus.loading;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div
      className={cn('page page--gray page--main', {
        'page__main--index-empty': activeOffers.length === 0,
      })}
    >
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <NavItem />
        <div className="cities">
          {activeOffers.length !== 0 ? (
            <div className="cities__places-container container">
              <OfferSection onActiveOfferChange={handleActiveOfferChange} />
              <div className="cities__right-section">
                <Map
                  className="cities__map"
                  offers={activeOffers}
                  activeOffer={activeOffer}
                />
              </div>
            </div>
          ) : <MainEmpty />}
        </div>
      </main>
    </div>
  );
});

Main.displayName = 'Main';

export default Main;
