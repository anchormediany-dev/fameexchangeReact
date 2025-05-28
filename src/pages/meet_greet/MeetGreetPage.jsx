import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import meet1 from "../../assets/images/meet-1.png";
import meet2 from "../../assets/images/meet-2.png";
import meet3 from "../../assets/images/meet-3.png";
import meet4 from "../../assets/images/meet-4.png";
import meet5 from "../../assets/images/meet-5.png";
const MeetGreetCelebrities = () => {
  const [activeFilter, setActiveFilter] = useState("ALL CELEBRITIES");
  const [visibleCards, setVisibleCards] = useState(8);

  // Sample celebrity data with images
  const celebrities = [
    {
      id: 1,
      name: "Taylor Swift",
      category: "MUSICIAN",
      src: meet1,
      description:
        "Global superstar known for her storytelling songwriting, multiple Grammy wins, and record-breaking albums that have defined a generation of music lovers worldwide.",
      popularity: 95,
      price: "$2,500",
    },
    {
      id: 2,
      name: "Ryan Reynolds",
      category: "ACTOR",
      src: meet2,
      description:
        "Canadian-American actor known for Deadpool, his witty social media presence, and charismatic performances in both comedy and action films.",
      popularity: 88,
      price: "$3,200",
    },
    {
      id: 3,
      name: "Lionel Messi",
      category: "ATHLETE",
      src: meet3,
      description:
        "Argentine football legend and former Ballon d'Or winner, widely regarded as one of the greatest players of all time with an extraordinary career spanning decades.",
      popularity: 92,
      price: "$5,000",
    },
    {
      id: 4,
      name: "MrBeast",
      category: "INFLUENCER",
      src: meet4,
      description:
        "YouTube sensation known for elaborate challenges, massive giveaways, and philanthropic that has revolutionized content creation and online entertainment.",
      popularity: 90,
      price: "$1,800",
    },
    {
      id: 5,
      name: "Emma Stone",
      category: "ACTOR",
      src: meet5,
      description:
        "Academy Award-winning actress known for her versatile performances in both comedy and drama, with memorable roles in La La Land and Easy A.",
      popularity: 85,
      price: "$2,800",
    },
    {
      id: 6,
      name: "The Weeknd",
      category: "MUSICIAN",
      src: meet1,
      description:
        "Grammy-winning artist known for his distinctive voice, atmospheric sound, and chart-topping hits that have redefined modern R&B and pop music.",
      popularity: 87,
      price: "$2,200",
    },
    {
      id: 7,
      name: "LeBron James",
      category: "ATHLETE",
      src: meet2,
      description:
        "NBA legend and four-time champion known for his incredible athleticism, business ventures, and advocacy for social justice and education.",
      popularity: 91,
      price: "$4,500",
    },
    {
      id: 8,
      name: "Kim Kardashian",
      category: "REALITY STAR",
      src: meet3,
      description:
        "Media mogul and reality TV star known for building a business empire, influencing fashion and beauty trends, and her legal advocacy work.",
      popularity: 89,
      price: "$3,500",
    },
    {
      id: 9,
      name: "Dwayne Johnson",
      category: "ACTOR",
      src: meet4,
      description:
        "Former WWE superstar turned Hollywood megastar, known for his action-packed movies, motivational presence, and positive influence across entertainment and fitness.",
      popularity: 93,
      price: "$4,000",
    },
    {
      id: 10,
      name: "Billie Eilish",
      category: "MUSICIAN",
      src: meet5,
      description:
        "Grammy-winning pop sensation known for her unique style, powerful vocals, and innovative music videos that have captivated millions of fans globally.",
      popularity: 86,
      price: "$2,000",
    },
    {
      id: 11,
      name: "Serena Williams",
      category: "ATHLETE",
      src: meet1,
      description:
        "Tennis legend with 23 Grand Slam singles titles, known for her dominance on court, business ventures, and advocacy for equality in sports.",
      popularity: 88,
      price: "$3,800",
    },
    {
      id: 12,
      name: "Zendaya",
      category: "ACTOR",
      src: meet2,
      description:
        "Versatile actress and fashion icon known for Spider-Man, Euphoria, and Dune, representing a new generation of talent both in acting and in Hollywood.",
      popularity: 84,
      price: "$2,600",
    },
    {
      id: 13,
      name: "Gordon Ramsay",
      category: "REALITY STAR",
      src: meet3,
      description:
        "World-renowned chef and television personality known for his culinary expertise, fiery personality, and successful restaurant empire spanning the globe.",
      popularity: 82,
      price: "$2,300",
    },
    {
      id: 14,
      name: "Cristiano Ronaldo",
      category: "ATHLETE",
      src: meet4,
      description:
        "Portuguese football icon and five-time Ballon d'Or winner, known for his incredible goal-scoring record and dedication to fitness and excellence.",
      popularity: 94,
      price: "$6,000",
    },
    {
      id: 15,
      name: "Ariana Grande",
      category: "MUSICIAN",
      src: meet5,
      description:
        "Pop superstar with a powerful four-octave vocal range, known for her chart-topping albums and sold-out world tours that captivate millions.",
      popularity: 89,
      price: "$2,400",
    },
    {
      id: 16,
      name: "Kylie Jenner",
      category: "REALITY STAR",
      src: meet1,
      description:
        "Beauty entrepreneur and reality star who built a billion-dollar cosmetics empire, known for setting trends in fashion and social media.",
      popularity: 83,
      price: "$3,000",
    },
  ];

  const filters = [
    "ALL CELEBRITIES",
    "MUSICIANS",
    "ACTORS",
    "ATHLETES",
    "INFLUENCERS",
    "REALITY STARS",
  ];

  const filteredCelebrities = useMemo(() => {
    let filtered = celebrities;

    if (activeFilter !== "ALL CELEBRITIES") {
      const categoryMap = {
        MUSICIANS: "MUSICIAN",
        ACTORS: "ACTOR",
        ATHLETES: "ATHLETE",
        INFLUENCERS: "INFLUENCER",
        "REALITY STARS": "REALITY STAR",
      };
      filtered = celebrities.filter(
        (celeb) => celeb.category === categoryMap[activeFilter]
      );
    }

    return filtered.sort((a, b) => b.popularity - a.popularity);
  }, [activeFilter]);

  const visibleCelebrities = filteredCelebrities.slice(0, visibleCards);
  const hasMore = visibleCards < filteredCelebrities.length;

  const loadMore = () => {
    setVisibleCards((prev) => Math.min(prev + 8, filteredCelebrities.length));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-[#171717] text-white mt-10 lg:mt-16 2xl:mt-20 ">
      {/* Header Section */}
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="custom-heading-one text-[#a38b41] mb-8 tracking-tight leading-tight">
          Meet & Greet with Your
          <br />
          Favourite Talent
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Exclusive access to premium celebrity experiences worldwide. Book your
          once-in-a-lifetime moment.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="container px-4 pb-12 2xl:pb-16  border-b border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setVisibleCards(8);
              }}
              className={`px-8 py-4 rounded-full cursor-pointer font-semibold transition-all duration-300 text-sm tracking-wider ${
                activeFilter === filter
                  ? "custom-button-two"
                  : "bg-[#2a2a2a] text-gray-300 hover:bg-[#333333] hover:text-white border border-gray-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Celebrity Cards Grid */}
      <div className="container  px-4 py-12 ">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {visibleCelebrities.map((celebrity, index) => (
              <motion.div
                key={`${celebrity.id}-${activeFilter}`}
                className=" rounded-xl border border-gray-700 overflow-hidden hover:border-gray-500 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                layout
              >
                {/* Celebrity Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={celebrity.src}
                    alt={celebrity.src}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Name and Price */}
                  <div className=" mb-3">
                    <h3 className="text-xl font-bold text-[#a38b41] transition-colors">
                      {celebrity.name}
                    </h3>
                    <span className=" text-gray-400 font-semibold">
                      {celebrity.category}
                    </span>
                  </div>

                  {/* Description */}
                  <span className="text-sm leading-relaxed line-clamp-3 mb-4">
                    {celebrity.description}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={loadMore}
              className="bg-white custom-button-two font-bold py-4 px-12 rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              Load More Celebrities
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MeetGreetCelebrities;
