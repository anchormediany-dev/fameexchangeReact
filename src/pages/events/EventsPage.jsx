import FeaturedEvents from "../../components/events/FeaturedEvents";
import EventsListings from "../../components/events/EventsListings";
import GoogleMapsEvents from "../../components/events/GoogleMapsEvents";
import EventsPreferencesActions from "../../components/events/EventsPreferencesActions";
import EventsCalendar from "../../components/events/EventsCalendar";
import SearchEvents from "../../components/events/SearchEvents";

const UltraModernEventsPllatform = () => {
  return (
    <section className="w-full z-50 bg-gradient-to-br py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="2xl:gap-16 gap-12 px-4 container sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20">
        <SearchEvents />
        <div className="flex flex-col 2xl:gap-16 gap-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-stretch">
            <GoogleMapsEvents />
            <EventsCalendar />
            <EventsPreferencesActions />
          </div>
          <EventsListings />
          <FeaturedEvents />
        </div>
      </div>
    </section>
  );
};

export default UltraModernEventsPllatform;
