import FeaturedEvents from "../../components/events/FeaturedEvents";
import EventsListings from "../../components/events/EventsListings";
import GoogleMapsEvents from "../../components/events/GoogleMapsEvents";
import EventsPreferencesActions from "../../components/events/EventsPreferencesActions";
import EventsCalendar from "../../components/events/EventsCalendar";
import SearchEvents from "../../components/events/SearchEvents";
import { useGetEventsQuery, useLazySearchEventsQuery } from "../../app/authApi";
import { useState, useMemo, useEffect } from "react";

const CDN_BASE = import.meta.env.VITE_API_IMAGE_BASE_URL || "";
const sameDay = (a, b) =>
  a &&
  b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const UltraModernEventsPllatform = () => {
  // Base list (unchanged)
  const { data, isLoading, isError, error, isFetching, refetch } =
    useGetEventsQuery();
  const [eventsDate, setEventsDate] = useState(null);

  // Search (separate from base list)
  const [
    triggerSearch,
    {
      data: searchData,
      isFetching: isSearchFetching,
      isError: isSearchError,
      error: searchError,
    },
  ] = useLazySearchEventsQuery();

  const [searchActive, setSearchActive] = useState(false);
  const [lastQuery, setLastQuery] = useState("");
  const [lastParams, setLastParams] = useState(null);
  const [searchMeta, setSearchMeta] = useState(null);

  const resolveImage = (p) => {
    if (!p) return "";
    if (/^https?:\/\//i.test(p)) return p;
    const cleaned = String(p).replace(/\\/g, "/").replace(/^\/+/, "");
    return `${CDN_BASE}${cleaned}`;
  };

  // Map search results (for dropdown)
  const searchRaw = Array.isArray(searchData?.data) ? searchData.data : [];
  const searchEvents = searchRaw.map((e) => ({
    id: e._id,
    name: e.title,
    details: e.details,
    type: e.event_type,
    status: e.status,
    category: e.category,
    location: e.location,
    address: e.address,
    phone: e.phone,
    website: e.website,
    datetime: e.datetime,
    createdAt: e.createdAt,
    coordinates: e.event_coordinates || null,
    isFeatured: !!e.is_featured,
    regularPrice: e.regular_price,
    discountPercent: e.discount_percent,
    discountCodes: e.discount_codes || [],
    preference: e.prefrence,
    logo: resolveImage(e.logo),
    cover: resolveImage(e.event_cover) || resolveImage(e.event_images?.[0]),
    images: (e.event_images || []).map(resolveImage),
  }));

  // FULL search (only on Enter)
  const handleSearchSubmit = async (q) => {
    if (!q?.trim()) return;
    const now = new Date();
    const params = {
      q: q.trim(),
      month: now.getMonth() + 1,
      withinMonth: true,
      year: now.getFullYear(),
      featured: true,
      status: "active",
    };
    setSearchActive(true);
    setLastQuery(q.trim());
    setLastParams(params);
    const res = await triggerSearch(params);
    try {
      const payload = await res.unwrap();
      setSearchMeta({
        month: payload?.month ?? null,
        year: payload?.year ?? null,
        total:
          payload?.total ??
          (Array.isArray(payload?.data) ? payload.data.length : 0),
      });
    } catch {
      // handled by RTK state
    }
  };

  const handleSearchClear = () => {
    setSearchActive(false);
    setLastQuery("");
    setLastParams(null);
    setSearchMeta(null);
  };

  useEffect(() => {
    if (searchActive && searchData) {
      setSearchMeta({
        month: searchData?.month ?? null,
        year: searchData?.year ?? null,
        total: searchData?.total ?? searchEvents.length,
      });
    }
  }, [searchActive, searchData, searchEvents.length]);

  // ---- Base list mapping (unchanged) ----
  const raw = Array.isArray(data?.data) ? data.data : [];
  const events = raw.map((e) => ({
    id: e._id,
    name: e.title,
    details: e.details,
    type: e.event_type,
    status: e.status,
    category: e.category,
    location: e.location,
    address: e.address,
    phone: e.phone,
    website: e.website,
    datetime: e.datetime,
    createdAt: e.createdAt,
    coordinates: e.event_coordinates || null,
    isFeatured: !!e.is_featured,
    regularPrice: e.regular_price,
    discountPercent: e.discount_percent,
    discountCodes: e.discount_codes || [],
    preference: e.prefrence,
    logo: resolveImage(e.logo),
    cover: resolveImage(e.event_cover),
    images: (e.event_images || []).map(resolveImage),
  }));

  const filteredEvents = useMemo(() => {
    if (!eventsDate) return events;
    return events.filter((ev) => {
      if (!ev.datetime) return false;
      const created = new Date(ev.datetime);
      return sameDay(created, eventsDate);
    });
  }, [events, eventsDate]);

  const featuredEvents = useMemo(
    () => events.filter((e) => e.isFeatured),
    [events]
  );

  return (
    <section className="w-full z-50 bg-gradient-to-br py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="2xl:gap-16 gap-12 px-4 container sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20">
        {/* Search with dropdown results (Enter only) */}
        <SearchEvents
          onSearch={handleSearchSubmit}
          onClear={handleSearchClear}
          isSearching={isSearchFetching}
          isActive={searchActive} // keeps dropdown open after submit
          results={searchEvents}
          resultsLoading={isSearchFetching}
          resultsError={
            isSearchError
              ? searchError?.data?.message || "Failed to search"
              : null
          }
        />

        <div className="flex flex-col 2xl:gap-16 gap-12">
          {/* Base content stays independent of search */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-stretch">
            <GoogleMapsEvents />
            <EventsCalendar
              events={events}
              selectedDate={eventsDate}
              onDateChange={setEventsDate}
            />
            {/* <EventsPreferencesActions /> */}
          </div>

          <EventsListings
            events={filteredEvents}
            isLoading={isLoading}
            isError={isError}
            error={error}
            isFetching={isFetching}
            onRetry={refetch}
            eventsDate={eventsDate}
          />

          <FeaturedEvents events={featuredEvents} />
        </div>
      </div>
    </section>
  );
};

export default UltraModernEventsPllatform;
