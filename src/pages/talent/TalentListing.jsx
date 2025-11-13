import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaCalendarAlt,
  FaClock,
  FaCheck,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parse,
  getDay,
} from "date-fns";
import meet1 from "../../assets/images/meet-1.png";
import meet2 from "../../assets/images/meet-2.png";
import meet3 from "../../assets/images/meet-3.png";
import meet4 from "../../assets/images/meet-4.png";
import meet5 from "../../assets/images/meet-5.png";
const TalentListing = () => {
  const sectionRef = useRef(null);
  const calendarRefs = useRef({});
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [calendarVisibleFor, setCalendarVisibleFor] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    minPopularity: 0,
    availability: "",
  });

  const categories = [
    "All",
    "MUSICIAN",
    "ACTOR",
    "ATHLETE",
    "INFLUENCER",
    "REALITY STAR",
  ];

  const talents = [
    {
      id: 1,
      name: "Taylor Swift",
      category: "MUSICIAN",
      src: meet1,
      description:
        "Global superstar known for her storytelling songwriting, multiple Grammy wins, and record-breaking albums that have defined a generation of music lovers worldwide.",
      popularity: 95,
      price: "$2,500",
      availability: [
        "July 16, 2025",
        "July 24, 2025",
        "August 3, 2025",
        "August 12, 2025",
      ],
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
      availability: ["July 20, 2025", "August 5, 2025", "August 15, 2025"],
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
      availability: ["July 18, 2025", "August 1, 2025", "August 10, 2025"],
    },
    {
      id: 4,
      name: "MrBeast",
      category: "INFLUENCER",
      src: meet4,
      description:
        "YouTube sensation known for elaborate challenges, massive giveaways, and philanthropic efforts that have revolutionized content creation and online entertainment.",
      popularity: 90,
      price: "$1,800",
      availability: ["July 25, 2025", "August 7, 2025"],
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
      availability: ["July 28, 2025", "August 6, 2025"],
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
      availability: ["July 22, 2025", "August 2, 2025"],
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
      availability: ["July 30, 2025", "August 12, 2025"],
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
      availability: ["August 1, 2025", "August 8, 2025"],
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
      availability: ["July 27, 2025", "August 4, 2025", "August 11, 2025"],
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
      availability: ["July 23, 2025", "August 9, 2025"],
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
      availability: ["July 29, 2025", "August 13, 2025"],
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
      availability: ["July 31, 2025", "August 10, 2025"],
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
      availability: ["July 26, 2025", "August 6, 2025"],
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
      availability: ["July 21, 2025", "August 14, 2025"],
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
      availability: ["July 17, 2025", "August 5, 2025"],
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
      availability: ["July 19, 2025", "August 3, 2025"],
    },
  ];

  // Calendar functions
  const navigateMonth = (direction) => {
    setCurrentDate(
      direction === 1 ? addMonths(currentDate, 1) : subMonths(currentDate, 1)
    );
  };

  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDay = getDay(monthStart);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const days = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    daysInMonth.forEach((day) => days.push(day.getDate()));
    return days;
  };

  const dateHasAvailability = (talent, day) => {
    if (!day) return false;
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return talent.availability.some((availDate) =>
      isSameDay(parse(availDate, "MMMM d, yyyy", new Date()), date)
    );
  };

  // Filter talents
  const filteredTalents = talents.filter((talent) => {
    const matchesSearch = talent.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !filters.category || talent.category === filters.category;
    const matchesAvailability =
      !filters.availability ||
      talent.availability.includes(filters.availability);

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  // Calendar component
  const TalentCalendar = ({ talent }) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="bg-[#222222] rounded-lg p-4 mt-4 border border-[#333333]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Available Dates</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1 rounded hover:bg-[#333333]"
            >
              <FaChevronLeft size={14} />
            </button>
            <span className="text-sm">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button
              onClick={() => navigateMonth(1)}
              className="p-1 rounded hover:bg-[#333333]"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-gray-400 p-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {generateCalendarDays().map((day, index) => {
            const isAvailable = day && dateHasAvailability(talent, day);
            return (
              <div key={index} className="aspect-square">
                {day && (
                  <button
                    onClick={() =>
                      isAvailable &&
                      setSelectedDate(
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          day
                        )
                      )
                    }
                    className={`w-full h-full rounded text-sm ${
                      isAvailable
                        ? selectedDate &&
                          isSameDay(
                            selectedDate,
                            new Date(
                              currentDate.getFullYear(),
                              currentDate.getMonth(),
                              day
                            )
                          )
                          ? "bg-[#a38b41] text-white"
                          : "bg-[#a38b41]/30 hover:bg-[#a38b41]/50 text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {day}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {selectedDate && (
          <div className="mt-4 p-3 bg-[#2d2d2d] rounded border border-[#a38b41]/30">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">
                  {format(selectedDate, "MMMM d, yyyy")}
                </p>
                <p className="text-xs text-gray-400">Available time slots</p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-2 py-1 text-xs bg-red-500/10 text-red-400 rounded">
                  <FaTimes size={10} /> Decline
                </button>
                <button className="flex items-center gap-1 px-2 py-1 text-xs bg-[#a38b41] text-black rounded">
                  <FaCheck size={10} /> Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="mt-10 lg:mt-16 2xl:mt-20 py-12 2xl:py-16 bg-[#171717] text-white"
    >
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="gredient-text uppercase tracking-wider mb-2">
            THE INVERSE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            MEET & GREET WITH YOUR FAVORITE TALENT
          </h2>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search talents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#222222] border border-[#333333] rounded-lg focus:outline-none focus:ring-2"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#222222] border border-[#333333] rounded-lg hover:bg-[#2d2d2d] transition"
            >
              <FaFilter />
              <span>Filters</span>
              {showFilters ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-6 bg-[#222222] rounded-lg border border-[#333333]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      setFilters({ ...filters, category: e.target.value })
                    }
                    className="w-full p-2 bg-[#2d2d2d] border border-[#333333] rounded"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat === "All" ? "" : cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Available On
                  </label>
                  <input
                    type="date"
                    value={filters.availability}
                    onChange={(e) =>
                      setFilters({ ...filters, availability: e.target.value })
                    }
                    className="w-full p-2 bg-[#2d2d2d] border border-[#333333] rounded"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setFilters({
                        category: "",
                        minPrice: "",
                        maxPrice: "",
                        minPopularity: 0,
                        availability: "",
                      });
                      setSearchTerm("");
                    }}
                    className="px-4 py-2 bg-[#333333] rounded hover:bg-[#3d3d3d] transition"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Talent Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTalents.map((talent) => (
            <motion.div
              key={talent.id}
              ref={(el) => (calendarRefs.current[talent.id] = el)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-[#222222] rounded-lg overflow-hidden border border-[#333333] hover:border-[#F3BA18] transition"
            >
              <img
                src={talent.src}
                alt={talent.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">{talent.name}</h3>
                  <span className="text-xs bg-[#333333] px-2 py-1 rounded">
                    {talent.category}
                  </span>
                </div>
                <div className="flex items-center mb-3">
                  <FaStar className="gredient-text mr-1" />
                  <span>{talent.popularity}% Popularity</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {talent.description}
                </p>

                <button
                  onClick={() => {
                    setCalendarVisibleFor((prev) => {
                      const newId = prev === talent.id ? null : talent.id;
                      if (newId && calendarRefs.current[newId]) {
                        setTimeout(() => {
                          calendarRefs.current[newId]?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }, 100);
                      }
                      return newId;
                    });
                  }}
                  className="w-full flex items-center justify-center gap-2 mb-2 gradient-bg text-black font-medium py-2 px-4 rounded transition"
                >
                  <FaCalendarAlt /> Check Availability
                </button>

                {calendarVisibleFor === talent.id && (
                  <TalentCalendar talent={talent} />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTalents.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No talents found</h3>
            <p className="text-gray-400 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setFilters({
                  category: "",
                  minPrice: "",
                  maxPrice: "",
                  minPopularity: 0,
                  availability: "",
                });
                setSearchTerm("");
              }}
              className="px-4 py-2 gradient-bg text-black rounded transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TalentListing;
