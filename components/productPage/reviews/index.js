import { Rating } from '@mui/material';
import { useSession, signIn } from 'next-auth/react';
import AddReview from './AddReview';
import styles from './styles.module.scss';
import Table from './Table';

export default function Reviews({ product }) {
  const { data: session } = useSession();
  return (
    <div className={styles.reviews}>
      <div className={styles.reviews__container}>
        <h1>Customer Reviews ({product.reviews.length})</h1>
        <div className={styles.reviews__stats}>
          <div className={styles.reviews__stats_overview}>
            <span>Average Rating</span>
            <div className={styles.reviews__stats_overview_rating}>
              <Rating
                name='half-rating-head'
                defaultValue={product.rating}
                precision={0.5}
                style={{ color: '#FACF19' }}
                readOnly
              />
              {product.rating == 0 ? 'No review yet.' : product.rating}
            </div>
          </div>
          <div className={styles.reviews__stats_reviews}>
            {product.ratings.map((rating, i) => (
              <div
                key={rating}
                className={styles.reviews__stats_reviews_review}
              >
                <Rating
                  name='half-rating-head'
                  defaultValue={5 - i}
                  style={{ color: '#FACF19' }}
                  readOnly
                />
                <div className={styles.bar}>
                  <div
                    className={styles.bar__inner}
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
                <span>{rating.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
        {session ? (
          <AddReview product={product} />
        ) : (
          <button onClick={() => signIn()} className={styles.login_btn}>
            Login to add a review.
          </button>
        )}
        <Table />
      </div>
    </div>
  );
}
