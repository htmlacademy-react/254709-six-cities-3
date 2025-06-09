import {
  ReactEventHandler,
  useState,
  Fragment,
  FormEvent,
  useCallback,
} from 'react';
import { rating } from '../../const';
import { sendComment } from '../../store/thunk/offer-detail-thunk';
import { useAppDispatch } from '../../store';
import { useParams } from 'react-router-dom';
import { MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH } from '../../const';

type HandleChangeType = ReactEventHandler<
  HTMLInputElement | HTMLTextAreaElement
>;

const ReviewForm = (): JSX.Element => {
  const { id: offerId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [review, setReview] = useState({ rating: 0, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange: HandleChangeType = useCallback(
    (evt) => {
      const { name, value } = evt.currentTarget;
      setReview((prev) => ({
        ...prev,
        [name]: name === 'rating' ? Number(value) : value,
      }));
      if (submitError) {
        setSubmitError(null);
      }
    },
    [submitError]
  );

  const handleSubmitComment = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!offerId) {
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(sendComment({ offerId, review })).unwrap();
      setReview({ rating: 0, comment: '' });
    } catch (error) {
      setSubmitError('Post comment error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormDisabled =
    review.comment.length < MIN_COMMENT_LENGTH ||
    review.comment.length > MAX_COMMENT_LENGTH ||
    review.rating === 0 ||
    isSubmitting;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt) => {
        handleSubmitComment(evt);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {rating.map(({ value, label }) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              onChange={handleChange}
              checked={review.rating === value}
              disabled={isSubmitting}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={label}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChange}
        value={review.comment}
        disabled={isSubmitting}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">
            {MIN_COMMENT_LENGTH} characters
          </b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isFormDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
