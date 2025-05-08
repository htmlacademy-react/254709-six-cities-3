import { Link } from 'react-router-dom';
import { OfferType } from '../../mocks/offers';
import { calculateRating } from '../../utils';
import { AppRoute } from '../../const';

type PlaceCardProps = {
  offer: OfferType;
};

export const FavoriteCard = ({ offer }: PlaceCardProps) => {
  const { id, title, type, price, previewImage, isFavorite, isPremium, rating } = offer;

  return (
    <article className='favorites__card place-card'>
      {isPremium && (
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      )}
      <div className='favorites__image-wrapper place-card__image-wrapper'>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width='150 : 260'
            height='110 : 200'
            alt={title}
          />
        </Link>
      </div>
      <div className={'favorites__card-info place-card__info'}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${calculateRating(rating)}` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
};
