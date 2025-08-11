import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import imageText from "../../assets/images/fame-exchange-image-text.png";
import "../../components/customer_review/CustomerReview.css";
const clampStars = (n) => Math.max(0, Math.min(5, Number(n) || 0));
const CustomerReview = ({ reviews: propReviews }) => {
  const { state } = useLocation();
  const stateReviews = state?.reviews;

  const reviews = Array.isArray(propReviews)
    ? propReviews
    : Array.isArray(stateReviews)
    ? stateReviews
    : [];

  return (
    <section className="bg-[#171717] py-12 2xl:py-16 px-4">
      <div className="container mt-10 lg:mt-16 2xl:mt-20">
        <div className="text-center mb-12">
          <h2 className="text-white custom-heading-one mb-4">
            Customer Reviews
          </h2>

          <div className="mt-6">
            <img
              style={{ width: "-webkit-fill-available" }}
              src={imageText}
              alt="Graphic Text"
            />
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center text-gray-300 py-10">
            No reviews to display.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="review-card hover:translate-y-[-4px] transition-transform"
              >
                <h3 className="review-name custom-heading-seven">
                  {(review.customerName || "").toUpperCase()}
                </h3>
                <p className="review-text">{review.reviewDetail}</p>
                <div className="review-stars">
                  {Array.from({ length: clampStars(review.starsRating) }).map(
                    (_, i) => (
                      <span key={i} style={{ display: "inline-block" }}>
                        <FaStar />
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerReview;
