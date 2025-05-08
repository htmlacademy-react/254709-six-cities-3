import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { calculateRating } from '../../utils';
import { OfferType } from '../../mocks/offers';

type CardProps = {
  offer: OfferType;
  handleHover?: (offer?: OfferType) => void;
  isFavoritePage?: boolean;
};

const Card = ({ offer, handleHover, isFavoritePage }: CardProps): JSX.Element => {
  const {
    isFavorite,
    id,
    isPremium,
    previewImage,
    price,
    rating,
    title,
    type,
  } = offer;

  const handleMouseOn = () => handleHover && handleHover(offer);
  const handleMouseOff = () => handleHover && handleHover();

  return (
    <article
      className={`${isFavoritePage ? 'favorites__card' : 'cities__card'} place-card`}
      onMouseEnter={handleMouseOn}
      onMouseLeave={handleMouseOff}
    >
      {isPremium && (
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      )}
      <div className={`${isFavoritePage ? 'favorites__image-wrapper' : 'cities__image-wrapper'} place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className='place-card__image'
            src={previewImage}
            width={isFavoritePage ? 150 : 260}
            height={isFavoritePage ? 110 : 200}
            alt={title}
          />
        </Link>
      </div>
      <div className={`${isFavoritePage && 'favorites__card-info'} place-card__info`}>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite && 'place-card__bookmark-button--active'}`}
          >
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: `${calculateRating(rating)}` }} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <a href='#'>{title}</a>
        </h2>
        <p className='place-card__type'>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
};

export default Card;
