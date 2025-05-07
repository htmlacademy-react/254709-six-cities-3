import ReviewItem from '../review-item/review-item';
import ReviewForm from '../review-form/review-form';
import { AuthorizationStatus } from '../../const';
import { ReviewsType } from '../../mocks/reviews';

type ReviewListProps = {
  authorizationStatus: (typeof AuthorizationStatus)[keyof typeof AuthorizationStatus];
  reviews: ReviewsType;
};

const ReviewList = ({ authorizationStatus, reviews }: ReviewListProps): JSX.Element => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews · <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list">
      {reviews.map((review) => (<ReviewItem key={review.id} review={review}/>))}
    </ul>
    {authorizationStatus === 'AUTH' && <ReviewForm />}
  </section>
);

export default ReviewList;
