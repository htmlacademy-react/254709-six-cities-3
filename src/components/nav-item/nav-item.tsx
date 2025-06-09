import { Cities } from '../../const';
import CityItem from '../city-item/city-item';
import { useAppDispatch, useAppSelector } from '../../store';
import { offersSelectors } from '../../selectors/offers-selectors';
import { setCity } from '../../store/slices/offers-slice';
import { useCallback } from 'react';

type CityName = (typeof Cities)[number];

const NavItem = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(offersSelectors.selectCity);

  const handleActiveCityChange = useCallback((city: CityName) => {
    dispatch(setCity(city));
  }, [dispatch]);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Cities.map((city) => (
            <CityItem
              key={city}
              activeCity={activeCity}
              city={city}
              onClick={handleActiveCityChange}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default NavItem;
