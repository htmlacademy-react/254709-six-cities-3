import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { userSelectors } from '../../selectors/user-selectors';


type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const location = useLocation();
  const authorizationStatus = useAppSelector(userSelectors.selectAuthStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return children;
  }

  return (
    <Navigate
      to={AppRoute.Login}
      state={{ from: location }}
      replace
    />
  );
}

export default PrivateRoute;
