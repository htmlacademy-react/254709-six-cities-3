import { OfferType, OffersType } from '../../types/offers';
import Card from '../card/card';
import { useAppSelector } from '../../store';
import { sortingOptions } from '../../const';
import { offersSelectors } from '../../selectors/offers-selectors';
import { useState, useMemo, useCallback } from 'react';
import cn from 'classnames';

type OfferSectionProps = {
  onActiveOfferChange: (offer?: OfferType) => void;
};

const sortOffers = (offers: OffersType, sortingType: string): OffersType => {
  switch (sortingType) {
    case sortingOptions.lowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case sortingOptions.highToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case sortingOptions.topRated:
      return [...offers].sort((a, b) => b.rating - a.rating);
    case sortingOptions.popular:
    default:
      return offers;
  }
};

const OfferSection = ({
  onActiveOfferChange,
}: OfferSectionProps): JSX.Element => {
  const [activeSorting, setActiveSorting] = useState<string>(sortingOptions.popular);
  const [isSortingListOpen, setSortingListOpen] = useState(false);

  const handleSortingListToggle = useCallback(() => {
    setSortingListOpen((prev) => !prev);
  }, []);

  const handleSortingChange = useCallback((sorting: string) => {
    setActiveSorting(sorting);
    setSortingListOpen(false);
  }, []);

  const activeCity = useAppSelector(offersSelectors.selectCity);
  const allOffers = useAppSelector(offersSelectors.selectOffers);

  const activeOffers = useMemo(() =>
    allOffers.filter((offer) => offer.city.name === activeCity), [allOffers, activeCity]
  );


  const sortedOffers = useMemo(() =>
    sortOffers(activeOffers, activeSorting), [activeOffers, activeSorting]
  );

  const sortingOptionsList = useMemo(() =>
    Object.values(sortingOptions).map((option) => (
      <li
        key={option}
        className={cn('places__option', {
          'places__option--active': activeSorting === option,
        })}
        tabIndex={0}
        onClick={() => handleSortingChange(option)}
      >
        {option}
      </li>
    )), [activeSorting, handleSortingChange]
  );

  const offerCards = useMemo(() =>
    sortedOffers.map((offer) => (
      <Card
        key={offer.id}
        offer={offer}
        handleHover={onActiveOfferChange}
      />
    )), [sortedOffers, onActiveOfferChange]
  );

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {activeOffers.length} {activeOffers.length === 1 ? 'place' : 'places'} to stay in {activeCity}
      </b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type"
          tabIndex={0}
          onClick={handleSortingListToggle}
        >
          {activeSorting}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul
          className={cn('places__options', 'places__options--custom', {
            'places__options--opened': isSortingListOpen,
          })}
        >
          {sortingOptionsList}
        </ul>
      </form>
      <div className="cities__places-list places__list tabs__content">
        {offerCards}
      </div>
    </section>
  );
};

export default OfferSection;
