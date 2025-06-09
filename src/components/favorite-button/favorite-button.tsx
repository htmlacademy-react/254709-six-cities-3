import { useAppDispatch } from '../../store';
import { toggleFavorite } from '../../utils';
import cn from 'classnames';
import { memo, useCallback, useMemo } from 'react';
import { useAppSelector } from '../../store';
import { AuthorizationStatus, AppRoute } from '../../const';
import { userSelectors } from '../../selectors/user-selectors';
import { useNavigate } from 'react-router-dom';
import { CARD_ICON_WIDTH, CARD_ICON_HEIGHT, OFFER_ICON_WIDTH, OFFER_ICON_HEIGHT } from '../../const';

type FavoriteButtonProps = {
  isCard: boolean;
  id: string;
  isFavorite: boolean;
};

const FavoriteButton = memo<FavoriteButtonProps>(
  ({
    isCard,
    id,
    isFavorite,
  }: FavoriteButtonProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authorizationStatus = useAppSelector(userSelectors.selectAuthStatus);

    const isAuthenticated = (authorizationStatus === AuthorizationStatus.Auth);

    const handleToggleFavorite = useCallback(() => {
      toggleFavorite(dispatch, id, isFavorite);
      if (!isAuthenticated) {
        navigate(AppRoute.Login);
      }
    }, [dispatch, id, isFavorite, isAuthenticated, navigate]);

    const buttonClasses = useMemo(
      () =>
        cn('button', {
          'offer__bookmark-button': !isCard,
          'place-card__bookmark-button': isCard,
          'offer__bookmark-button--active': isFavorite && !isCard,
          'place-card__bookmark-button--active': isFavorite && isCard,
        }),
      [isCard, isFavorite]
    );

    const iconClasses = useMemo(
      () =>
        cn({
          'offer__bookmark-icon': !isCard,
          'place-card__bookmark-icon': isCard,
        }),
      [isCard]
    );

    const iconSize = useMemo(
      () => ({
        width: isCard ? CARD_ICON_WIDTH : OFFER_ICON_WIDTH,
        height: isCard ? CARD_ICON_HEIGHT : OFFER_ICON_HEIGHT,
      }),
      [isCard]
    );

    const isAbilityText = useMemo(() => {
      if (!isAuthenticated) {
        return 'Sign in to add to bookmarks';
      }
      return isFavorite ? 'Remove from bookmarks' : 'Add to bookmarks';
    }, [isFavorite, isAuthenticated]);

    return (
      <button
        name={id}
        className={buttonClasses}
        type="button"
        onClick={handleToggleFavorite}
        title={isAbilityText}
      >
        <svg
          className={iconClasses}
          width={iconSize.width}
          height={iconSize.height}
        >
          <use xlinkHref="#icon-bookmark" />
        </svg>
        <span className="visually-hidden">{isAbilityText}</span>
      </button>
    );
  }
);

FavoriteButton.displayName = 'FavoriteButton';

export default FavoriteButton;
