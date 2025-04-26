import { Cities } from '../../const';

const NavItem = (): JSX.Element => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Cities.map((city) => (
          <li className="locations__item" key={city}>
            <a className="locations__item-link tabs__item" href="#">
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export default NavItem;
