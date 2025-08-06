import { useState } from "react";
import ConfirmedRequestsCalendar from "./ConfirmedRequestsCalendar";
import PendingRequestsList from "./PendingRequestsList";

const MeetingRequests = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="container mx-auto flex gap-6 px-4 py-8">
      <ConfirmedRequestsCalendar />

      <PendingRequestsList
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
    </div>
  );
};

export default MeetingRequests;
