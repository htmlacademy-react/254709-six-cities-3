import Footer from '../../components/footer/footer';
import FavoritesMain from '../../components/favorites-main/favorites-main';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../store';
import { offersSelectors } from '../../selectors/offers-selectors';
import { memo, useMemo } from 'react';
import cn from 'classnames';

const Favorites = memo((): JSX.Element => {
  const favoriteOffersCount = useAppSelector(
    offersSelectors.selectFavoriteOffersCount
  );

  const hasFavorites = favoriteOffersCount > 0;

  const mainContent = useMemo(() => {
    if (hasFavorites) {
      return <FavoritesMain />;
    }
    return <FavoritesEmpty />;
  }, [hasFavorites]);

  return (
    <div className={cn('page', { 'page--favorites-empty': !hasFavorites })}>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      {mainContent}
      <Footer />
    </div>
  );
});

Favorites.displayName = 'Favorites';

export default Favorites;
