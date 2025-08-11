import { motion } from "framer-motion";
import imageText from "../../assets/images/fame-exchange-image-text.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import "./CustomerReview.css";
import "swiper/css";
import { useGetReviewsQuery } from "../../app/authApi";
import { Link } from "react-router-dom";
const CustomerReviews = () => {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetReviewsQuery();
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const headingVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const swiperVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  };

  const starVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: i * 0.1,
        ease: "backOut",
      },
    }),
    hover: {
      scale: 1.2,
      color: "#ffd700",
      transition: {
        duration: 0.2,
      },
    },
  };
  const reviews = Array.isArray(data?.data)
    ? [...data.data]
        .filter((r) => r?.status === "approved")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];
  // Always show 3 specific reviews (can be first 3 or any 3 you choose)
  const displayedReviews = reviews.slice(0, 3);

  const truncate = (text = "", max = 50) => {
    if (!text) return "";
    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    const end = cut.lastIndexOf(" ");
    const safe = end > 0 ? cut.slice(0, end) : text.slice(0, max - 1);
    return safe.trimEnd() + "…"; // never over 50 chars
  };

  return (
    <motion.div
      className="bg-[#171717] py-12 2xl:py-16 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container">
        {/* Heading */}
        <motion.div className="text-center mb-12" variants={containerVariants}>
          <motion.h2
            className="text-white custom-heading-one mb-4"
            variants={headingVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            Customer Reviews
          </motion.h2>
          <motion.p
            className="text-gray-400 text-center max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            See what customers are saying about this product.
            <br />
            Read their reviews and ratings to help with your decision.
            <br />
            Our customers appreciate the quality fit and style of our products.
            <br />
            If you purchased this item please leave a review to help others.
          </motion.p>
        </motion.div>

        {/* Reviews carousel */}
        <motion.div
          className="reviews-section relative"
          variants={swiperVariants}
        >
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
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={review.id}>
                <motion.div
                  className="review-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut",
                    },
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(163, 139, 65, 0.1)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.h3
                    className="review-name custom-heading-seven"
                    whileHover={{
                      color: "#a38b41",
                      transition: { duration: 0.2 },
                    }}
                  >
                    {review?.customerName}
                  </motion.h3>

                  <motion.p
                    className="review-text"
                    initial={{ opacity: 0 }}
                    whileInView={{
                      opacity: 1,
                      transition: { duration: 0.5, delay: 0.2 },
                    }}
                    viewport={{ once: true }}
                  >
                    {truncate(review?.reviewDetail, 80)}
                  </motion.p>

                  <motion.div
                    className="review-stars"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {Array(review?.starsRating)
                      .fill()
                      .map((_, i) => (
                        <motion.div
                          key={i}
                          variants={starVariants}
                          custom={i}
                          whileHover="hover"
                          style={{ display: "inline-block" }}
                        >
                          <FaStar />
                        </motion.div>
                      ))}
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* View All button */}
          <motion.div className="text-center mt-10" variants={buttonVariants}>
            <Link to="/reviews" state={{ reviews }}>
              <motion.button
                className="view-all-button"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                VIEW ALL
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div className="mt-2 container" variants={imageVariants}>
        <motion.img
          style={{
            width: "-webkit-fill-available",
          }}
          src={imageText}
          alt="Graphic Text"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default CustomerReviews;
