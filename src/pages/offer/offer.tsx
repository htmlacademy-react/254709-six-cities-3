import { useParams } from 'react-router-dom';
import NotFound from '../not-found/not-found';
import ReviewList from '../../components/review-list/review-list';
import type { OfferType } from '../../types/offers';
import { calculateRating } from '../../utils';
import Map from '../../components/map/map';
import NearPlaces from '../../components/near-places/near-places';
import { MAX_NEARBY_OFFERS_ON_MAP } from '../../const';

import { useAppSelector, useAppDispatch } from '../../store';
import { useEffect, useMemo } from 'react';
import { offerDetailSelectors } from '../../selectors/offer-detail-selectors';
import {
  fetchOfferDetail,
  fetchNearbyOffers,
  fetchComments,
} from '../../store/thunk/offer-detail-thunk';
import { RequestStatus } from '../../const';
import Spinner from '../../components/spinner/spinner';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import cn from 'classnames';

const Offer = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const status = useAppSelector(offerDetailSelectors.selectStatus);
  const currentOffer = useAppSelector(offerDetailSelectors.selectOffer);
  const comments = useAppSelector(offerDetailSelectors.selectComments);
  const nearbyOffers = useAppSelector(offerDetailSelectors.selectNearbyOffers);

  const limitedNearbyOffers = useMemo(
    () => nearbyOffers.slice(0, MAX_NEARBY_OFFERS_ON_MAP),
    [nearbyOffers]
  );

  const mapOffers = useMemo(() => {
    if (!currentOffer) {
      return limitedNearbyOffers;
    }
    const currentOfferForMap: OfferType = {
      id: currentOffer.id,
      title: currentOffer.title,
      type: currentOffer.type,
      price: currentOffer.price,
      previewImage: currentOffer.images[0] || '',
      city: currentOffer.city,
      location: currentOffer.location,
      isFavorite: currentOffer.isFavorite,
      isPremium: currentOffer.isPremium,
      rating: currentOffer.rating,
    };
    return [currentOfferForMap, ...limitedNearbyOffers];
  }, [currentOffer, limitedNearbyOffers]);

  useEffect(() => {
    dispatch(fetchOfferDetail(id as string));
    dispatch(fetchNearbyOffers(id as string));
    dispatch(fetchComments(id as string));
  }, [dispatch, id]);

  if (status === RequestStatus.loading) {
    return <Spinner />;
  }
  if (!currentOffer) {
    return <NotFound />;
  }
  const {
    isFavorite,
    isPremium,
    price,
    rating,
    title,
    type,
    bedrooms,
    maxAdults,
    goods,
    host,
    images,
    description,
  } = currentOffer;

  return (
    <div className="page">
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.slice(0, 6).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                {id && (
                  <FavoriteButton
                    isCard={false}
                    id={id}
                    isFavorite={isFavorite}
                  />
                )}
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${calculateRating(rating)}` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} {maxAdults === 1 ? 'adult' : 'adults'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={cn(
                      'offer__avatar-wrapper user__avatar-wrapper',
                      { 'offer__avatar-wrapper--pro': host.isPro }
                    )}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>

              <ReviewList reviews={comments} />
            </div>
          </div>
          <Map
            className="offer__map"
            offers={mapOffers}
            activeOffer={currentOffer}
          />
        </section>
        <div className="container">
          <NearPlaces offers={limitedNearbyOffers} />
        </div>
      </main>
    </div>
  );
};

export default Offer;
