import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';

type AuthorizationStatusType = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatusType;
  children: JSX.Element;
}

function PrivateRoute({authorizationStatus, children}: PrivateRouteProps): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
