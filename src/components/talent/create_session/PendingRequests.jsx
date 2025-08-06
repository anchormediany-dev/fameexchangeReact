// import { useState } from "react";
// import {
//   FaCheck,
//   FaTimes,
//   FaCalendarAlt,
//   FaClock,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   format,
//   addMonths,
//   subMonths,
//   startOfMonth,
//   endOfMonth,
//   eachDayOfInterval,
//   isSameMonth,
//   isSameDay,
//   parse,
//   getDay,
// } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import { useGetConfirmedTalentRequestsQuery } from "../../../app/authApi";
// const MeetingRequests = () => {
//   const {
//     data: confirmedData,
//     isLoading,
//     isError,
//     error,
//   } = useGetConfirmedTalentRequestsQuery();
//   const requests =
//     confirmedData?.data?.map((item) => ({
//       id: item._id,
//       date: new Date(item.confirmedDate).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       }),
//       time: item.time,
//       status: "pending",
//     })) || [];
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const navigate = useNavigate();

//   const handleReschedule = (id) => {
//     navigate("/inverse#reschedule-section");
//   };

//   // Calendar data
//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const dayNames = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];

//   // Navigation
//   const navigateMonth = (direction) => {
//     setCurrentDate(
//       direction === 1 ? addMonths(currentDate, 1) : subMonths(currentDate, 1)
//     );
//   };

//   // Calendar generation
//   const generateCalendarDays = () => {
//     const monthStart = startOfMonth(currentDate);
//     const monthEnd = endOfMonth(currentDate);
//     const startDay = getDay(monthStart);
//     const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

//     const days = [];
//     // Empty slots for days before month starts
//     for (let i = 0; i < startDay; i++) {
//       days.push(null);
//     }
//     // Actual days of month
//     daysInMonth.forEach((day) => {
//       days.push(day.getDate());
//     });

//     return days;
//   };

//   // Check if date has requests
//   const dateHasRequests = (day) => {
//     if (!day) return false;
//     const date = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       day
//     );
//     return requests.some((req) => {
//       const requestDate = parse(req.date, "MMMM d, yyyy", new Date());
//       return isSameDay(requestDate, date) && req.status === "pending";
//     });
//   };

//   // Get requests for specific date
//   const getDateRequests = (day) => {
//     const date = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       day
//     );
//     return requests.filter((req) => {
//       const requestDate = parse(req.date, "MMMM d, yyyy", new Date());
//       return isSameDay(requestDate, date) && req.status === "pending";
//     });
//   };

//   // Handle request actions
//   const handleConfirm = (id) => {
//     setRequests(
//       requests.map((req) =>
//         req.id === id ? { ...req, status: "confirmed" } : req
//       )
//     );
//   };

//   const handleDecline = (id) => {
//     setRequests(
//       requests.map((req) =>
//         req.id === id ? { ...req, status: "declined" } : req
//       )
//     );
//   };

//   return (
//     <div className="container mx-auto flex gap-6 px-4 py-8">
//       {/* Calendar Section */}
//       <div className="bg-white/5 w-[40%] backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 mb-6">
//         {/* Compact Calendar Header */}
//         <h2
//           className="text-2xl font-bold text-primary2 mb-6 text-center"
//           style={{
//             background: "linear-gradient(to right, #a38b41, #d4c374)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             backgroundClip: "text",
//           }}
//         >
//           Confrimed Requests
//         </h2>

//         <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
//           <button
//             onClick={() => navigateMonth(-1)}
//             className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
//           >
//             <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
//           </button>

//           <div className="text-center">
//             <h2
//               className="text-lg sm:text-2xl font-bold"
//               style={{
//                 background: "linear-gradient(to right, #a38b41, #d4c374)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//               }}
//             >
//               {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
//             </h2>
//           </div>

//           <button
//             onClick={() => navigateMonth(1)}
//             className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
//           >
//             <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
//           </button>
//         </div>

//         {/* Compact Calendar Grid */}
//         <div className="flex-1 flex flex-col">
//           <div className="grid grid-cols-7 gap-1 mb-2 sm:mb-3">
//             {dayNames.map((day) => (
//               <div
//                 key={day}
//                 className="text-center font-semibold p-1 sm:p-2 text-gray-300 text-xs"
//               >
//                 {day.slice(0, 3)}
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-7 gap-1 flex-1">
//             {generateCalendarDays().map((day, index) => {
//               const hasRequests = dateHasRequests(day);
//               return (
//                 <div key={index} className="aspect-square">
//                   {day && (
//                     <button
//                       className={`w-full h-full flex flex-col items-center justify-center text-xs font-medium rounded-lg transition-all duration-300 hover:scale-105 relative ${
//                         hasRequests
//                           ? `bg-[#a38b41]/80 text-white hover:ring-2 hover:ring-white/50`
//                           : "hover:bg-white/10 text-gray-300 border border-white/5 hover:border-[#a38b41]/30"
//                       }`}
//                     >
//                       <span className="font-bold text-xs sm:text-sm">
//                         {day}
//                       </span>
//                       {hasRequests && (
//                         <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-[#a38b41] rounded-full border-2 border-gray-800"></div>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Requests List */}
//       <section className="w-[60%]">
//         <AnimatePresence>
//           {requests.filter((req) => {
//             const requestDate = parse(req.date, "MMMM d, yyyy", new Date());
//             return (
//               isSameMonth(requestDate, currentDate) && req.status === "pending"
//             );
//           }).length > 0 ? (
//             <div className="space-y-3">
//               {requests
//                 .filter((req) => {
//                   const requestDate = parse(
//                     req.date,
//                     "MMMM d, yyyy",
//                     new Date()
//                   );
//                   return (
//                     isSameMonth(requestDate, currentDate) &&
//                     req.status === "pending"
//                   );
//                 })
//                 .map((request) => (
//                   <motion.div
//                     key={request.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, x: -50 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                     className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-xl p-4 border border-white/10 hover:border-[#a38b41]/40 transition-all duration-300"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <FaClock className="text-[#a38b41]" />
//                         <div>
//                           <div className="text-white">{request.date}</div>
//                           <div className="text-gray-300 text-sm">
//                             {request.time}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleDecline(request.id)}
//                           className="flex items-center cursor-pointer gap-1 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 transition-colors"
//                         >
//                           <FaTimes />
//                           <span className="text-xs">Decline</span>
//                         </button>
//                         <button
//                           onClick={() => handleConfirm(request.id)}
//                           className="flex items-center cursor-pointer gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-[#a38b41] to-[#c2ab67] hover:from-[#c2ab67] hover:to-[#a38b41] text-black transition-all"
//                         >
//                           <FaCheck />
//                           <span className="text-xs">Confirm</span>
//                         </button>
//                         <button
//                           onClick={() => handleReschedule(request.id)}
//                           className="flex items-center cursor-pointer gap-1 px-3 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 text-blue-400 transition-colors"
//                         >
//                           <FaCalendarAlt />
//                           <span className="text-xs">Reschedule</span>
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//             </div>
//           ) : (
//             <div className="text-center py-8 bg-[#1f1f1f] rounded-xl border border-dashed border-white/10">
//               <div className="mx-auto w-16 h-16 rounded-full bg-[#1a1a1a] border-2 border-dashed border-[#a38b41]/30 flex items-center justify-center mb-4">
//                 <FaCalendarAlt className="text-[#a38b41]/50 text-xl" />
//               </div>
//               <h4 className="text-lg font-medium text-white mb-2">
//                 No pending requests
//               </h4>
//               <p className="text-gray-500 text-sm">
//                 No meeting requests for {monthNames[currentDate.getMonth()]}
//               </p>
//             </div>
//           )}
//         </AnimatePresence>
//       </section>
//     </div>
//   );
// };

// export default MeetingRequests;
import React from "react";

const PendingRequests = () => {
  return <div>PendingRequests</div>;
};

export default PendingRequests;
