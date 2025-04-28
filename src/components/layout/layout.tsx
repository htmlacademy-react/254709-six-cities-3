import { Outlet, useLocation, Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Logo from '../logo/logo';

type PathNameType = string;
type LayoutProps = {
  authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
};

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
  } else if (pathname === AppRoute.Offer || pathname === AppRoute.Favorites) {
    mainClassName = 'page';
    linkClassName = 'header__logo-link';
  }

  return { mainClassName, linkClassName, shouldRenderUser };
};

const Layout = ({ authorizationStatus }: LayoutProps): JSX.Element => {
  const { pathname } = useLocation();
  const { mainClassName, linkClassName, shouldRenderUser } =
    getLayoutState(pathname);

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
                          Oliver.conner@gmail.com
                        </span>
                        <div className="header__favorite-count">3</div>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#">
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
