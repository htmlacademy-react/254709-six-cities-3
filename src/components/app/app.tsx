import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import Layout from '../layout/layout';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import {
  fetchAllOffers,
  fetchFavoriteOffers,
} from '../../store/thunk/offers-thunk';
import { useAppDispatch, useAppSelector } from '../../store';
import { RequestStatus } from '../../const';
import { useEffect } from 'react';
import { offersSelectors } from '../../selectors/offers-selectors';
import { userSelectors } from '../../selectors/user-selectors';
import { checkAuthStatus } from '../../store/thunk/auth-thunk';
import { getToken } from '../../services/token';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(offersSelectors.selectStatus);
  const authStatus = useAppSelector(userSelectors.selectAuthStatus);

  useEffect(() => {
    const token = getToken();
    if (token && authStatus === AuthorizationStatus.Unknown) {
      dispatch(checkAuthStatus());
    }

    if (status === RequestStatus.idle) {
      dispatch(fetchAllOffers());
    }
  }, [dispatch, status, authStatus]);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffers());
    }
  }, [dispatch, authStatus]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<Layout />}>
            <Route index element={<Main />} />
            <Route path={AppRoute.Login} element={<Login />} />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route path={`${AppRoute.Offer}/:id`} element={<Offer />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
