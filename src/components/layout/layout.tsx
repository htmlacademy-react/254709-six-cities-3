import { Outlet, useLocation, Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../store';
import { userSelectors } from '../../selectors/user-selectors';
import { offersSelectors } from '../../selectors/offers-selectors';
import Logo from '../logo/logo';
import { logoutUser } from '../../store/thunk/auth-thunk';
import { useCallback } from 'react';

type PathNameType = string;

const getLayoutState = (pathname: PathNameType) => {
  let mainClassName = '';
  let linkClassName = '';
  let shouldRenderUser = true;

  if (pathname === AppRoute.Main) {
    mainClassName = 'page page--gray page--main';
    linkClassName = 'header__logo-link header__logo-link--active';
  } else if (pathname === AppRoute.Login) {
    mainClassName = 'page page--gray page--login';
    linkClassName = 'header__logo-link';
    shouldRenderUser = false;
  } else if (pathname.startsWith(AppRoute.Offer) || pathname === AppRoute.Favorites) {
    mainClassName = 'page';
    linkClassName = 'header__logo-link';
  }

  return { mainClassName, linkClassName, shouldRenderUser };
};

const Layout = (): JSX.Element => {
  const { pathname } = useLocation();
  const { mainClassName, linkClassName, shouldRenderUser } =
    getLayoutState(pathname);
  const authorizationStatus = useAppSelector(userSelectors.selectAuthStatus);
  const userEmail = useAppSelector(userSelectors.selectEmail);
  const favoriteOffersCount = useAppSelector(offersSelectors.selectFavoriteOffersCount);

  const dispatch = useAppDispatch();

  const handleLogout = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logoutUser());
  }, [dispatch]);

  return (
    <div className={mainClassName}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo logoClassName={linkClassName} />
            </div>
            {shouldRenderUser && (
              <nav className="header__nav">
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Favorites}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">
                          {userEmail}
                        </span>
                        <div className="header__favorite-count">{favoriteOffersCount}</div>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a
                        className="header__nav-link"
                        onClick={handleLogout}
                        href="#"
                      >
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </ul>
                ) : (
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Login}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__login">Sign in</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </nav>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
