import Logo from '../logo';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

const Header = (): JSX.Element => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Logo />
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link
                className="header__nav-link header__nav-link--profile"
                to="#"
              >
                <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                <span className="header__user-name user__name">
                  Oliver.conner@gmail.com
                </span>
                <Link className="header__favorite-count" to={AppRoute.Favorites}>3</Link>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-link" to="#">
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
);

export default Header;
