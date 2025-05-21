import imageText from "../../assets/images/fame-exchange-image-text.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import "./CustomerReview.css";
import "swiper/css";

const CustomerReviews = () => {
  // Review data
  const reviews = [
    {
      id: 1,
      name: "JANET JACKSON",
      text: "This was such a great experience I'm going to tell everyone I know I recommend The Fame Exchange",
      rating: 5,
    },
    {
      id: 2,
      name: "HENRY ROLLINS",
      text: "This was such a great experience I'm going to tell everyone I know I recommend The Fame Exchange",
      rating: 5,
    },
    {
      id: 3,
      name: "CALVIN HARRIS",
      text: "This was such a great experience I'm going to tell everyone I know I recommend The Fame Exchange",
      rating: 5,
    },
    {
      id: 4,
      name: "DIANA ROSS",
      text: "This was such a great experience I'm going to tell everyone I know I recommend The Fame Exchange",
      rating: 5,
    },
    {
      id: 5,
      name: "DAVID GUETTA",
      text: "This was such a great experience I'm going to tell everyone I know I recommend The Fame Exchange",
      rating: 5,
    },
  ];

  // Always show 3 specific reviews (can be first 3 or any 3 you choose)
  const displayedReviews = reviews.slice(0, 3);

  return (
    <div className="bg-[#171717] py-12 2xl:py-16 px-4">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-white custom-heading-one mb-4">
            Customer Reviews
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto leading-relaxed">
            See what customers are saying about this product.
            <br />
            Read their reviews and ratings to help with your decision.
            <br />
            Our customers appreciate the quality fit and style of our products.
            <br />
            If you purchased this item please leave a review to help others.
          </p>
        </div>

        {/* Reviews carousel - auto-rotating but always showing 3 cards */}
        <div className="reviews-section relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={80}
            slidesPerView={3}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="reviews-swiper"
            breakpoints={{
              // When screen width is less than 768px
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              // When screen width is >= 768px
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              // When screen width is >= 1024px
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="review-card">
                  <h3 className="review-name custom-heading-seven">
                    {review.name}
                  </h3>
                  <p className="review-text">{review.text}</p>
                  <div className="review-stars">
                    {Array(review.rating)
                      .fill()
                      .map((_, i) => (
                        <FaStar key={i} />
                      ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* View All button */}
          <div className="text-center mt-10">
            <button className="view-all-button">VIEW ALL</button>
          </div>
        </div>
      </div>
      <div className="mt-2 container">
        <img
          style={{
            width: "-webkit-fill-available",
          }}
          src={imageText}
          alt="Graphic Text"
        />
      </div>
    </div>
  );
};

export default CustomerReviews;
