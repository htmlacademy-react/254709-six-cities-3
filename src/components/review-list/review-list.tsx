import ReviewItem from '../review-item/review-item';
import ReviewForm from '../review-form/review-form';
import { AuthorizationStatus } from '../../const';
import { ReviewsType } from '../../types/reviews';
import { useAppSelector } from '../../store';
import { userSelectors } from '../../selectors/user-selectors';
import { useMemo } from 'react';
import { MAX_REVIEWS_COUNT } from '../../const';


type ReviewListProps = {
  reviews: ReviewsType;
};

const ReviewList = ({ reviews }: ReviewListProps): JSX.Element => {
  const authorizationStatus = useAppSelector(userSelectors.selectAuthStatus);

  const sortedAndLimitedReviews = useMemo(() =>
    [...reviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, MAX_REVIEWS_COUNT)
  , [reviews]);

  const reviewItems = useMemo(() =>
    sortedAndLimitedReviews.map((review) => (
      <ReviewItem key={review.id} review={review} />
    )), [sortedAndLimitedReviews]
  );

  const isAuthenticated = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviewItems}
      </ul>
      {isAuthenticated && <ReviewForm />}
    </section>
  );
};

export default ReviewList;
