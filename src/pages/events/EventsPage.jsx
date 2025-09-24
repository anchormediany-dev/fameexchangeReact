import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import FeaturedEvents from "../../components/events/FeaturedEvents";
import EventsListings from "../../components/events/EventsListings";
import GoogleMapsEvents from "../../components/events/GoogleMapsEvents";
import EventsCalendar from "../../components/events/EventsCalendar";
import SearchEvents from "../../components/events/SearchEvents";
import { useGetEventsQuery, useLazySearchEventsQuery } from "../../app/authApi";

const CDN_BASE = import.meta.env.VITE_API_IMAGE_BASE_URL || "";
const sameDay = (a, b) =>
  a &&
  b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const resolveImage = (p) => {
  if (!p) return "";
  if (/^https?:\/\//i.test(p)) return p;
  return `${CDN_BASE}${String(p).replace(/\\/g, "/").replace(/^\/+/, "")}`;
};

function PaginationControls({
  page,
  totalPages,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onGo,
  busy,
  selectedDate,
}) {
  if (!totalPages || totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return !selectedDate ? (
    <div className="flex flex-wrap items-center gap-2 justify-center mt-6">
      <button
        disabled={!hasPrev || busy}
        onClick={onPrev}
        className="px-3 py-1 rounded border text-sm disabled:opacity-50"
      >
        Prev
      </button>
      <div className="flex flex-wrap gap-1">
        {pages.map((p) => (
          <button
            key={p}
            disabled={busy}
            onClick={() => onGo(p)}
            className={`px-3 py-1 rounded border text-sm ${
              p === page ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        disabled={!hasNext || busy}
        onClick={onNext}
        className="px-3 py-1 rounded border text-sm disabled:opacity-50"
      >
        Next
      </button>
    </div>
  ) : null;
}

/* ---------- main ---------- */
const UltraModernEventsPllatform = () => {
  const [page, setPage] = useState(1);
  const listTopRef = useRef(null);

  const [limit] = useState(10);
  const baseParams = { page, limit, sort: "-createdAt", status: "active" };
  useEffect(() => {
    if (!listTopRef.current) return;
    const y =
      listTopRef.current.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [page]);
  const {
    data: baseResp,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useGetEventsQuery(baseParams);

  const [eventsDate, setEventsDate] = useState(null);

  /* Search (NO pagination) */
  const [
    triggerSearch,
    {
      data: searchResp,
      isFetching: isSearchFetching,
      isError: isSearchError,
      error: searchError,
    },
  ] = useLazySearchEventsQuery();

  const [searchActive, setSearchActive] = useState(false);
  const [lastQuery, setLastQuery] = useState("");

  const mapEvent = (e) => ({
    id: e._id,
    name: e.title,
    title: e.title,
    details: e.details,
    type: e.event_type,
    status: e.status,
    category: e.category,
    interested: e?.prefrences?.interested ?? 0,
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
  });

  /* Base list mapping */
  const rawBase = Array.isArray(baseResp?.data) ? baseResp.data : [];
  const events = rawBase.map(mapEvent);
  const baseMeta = baseResp?.meta || {
    page: 1,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false,
  };

  const filteredEvents = useMemo(() => {
    if (!eventsDate) return events;
    return events.filter((ev) => {
      if (!ev.datetime) return false;
      const d = new Date(ev.datetime);
      return sameDay(d, eventsDate);
    });
  }, [events, eventsDate]);

  const featuredEvents = useMemo(
    () => events.filter((e) => e.isFeatured),
    [events]
  );

  /* Search mapping (no pagination) */
  const searchRaw = Array.isArray(searchResp?.data) ? searchResp.data : [];
  const searchEvents = searchRaw.map(mapEvent);

  /* Search handlers (memoized) */
  const handleSearchSubmit = useCallback(
    async (q) => {
      if (!q?.trim()) return;
      setSearchActive(true);
      const clean = q.trim();
      setLastQuery(clean);

      const now = new Date();
      await triggerSearch({
        q: clean,
        month: now.getMonth() + 1,
        withinMonth: true,
        year: now.getFullYear(),
        featured: true,
        status: "active",
        sort: "-createdAt",
      });
    },
    [triggerSearch]
  );

  const handleSearchClear = useCallback(() => {
    setSearchActive(false);
    setLastQuery("");
  }, []);

  /* Base pagination actions */
  const goBasePage = (p) => setPage(p);

  return (
    <section className="w-full z-50 bg-gradient-to-br py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="2xl:gap-16 gap-12 px-4 container sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20">
        <SearchEvents
          onSearch={handleSearchSubmit}
          onClear={handleSearchClear}
          isSearching={isSearchFetching}
          isActive={searchActive}
          results={searchEvents}
          resultsLoading={isSearchFetching}
          resultsError={
            isSearchError
              ? searchError?.data?.message || "Failed to search"
              : null
          }
        />

        <div className="flex flex-col 2xl:gap-16 gap-12">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-stretch">
            <GoogleMapsEvents
              allTalentsEvents={searchActive ? searchEvents : events}
              filteredEventsByCalendar={
                searchActive ? searchEvents : filteredEvents
              }
            />
            <EventsCalendar
              events={searchActive ? searchEvents : events}
              selectedDate={eventsDate}
              onDateChange={setEventsDate}
            />
          </div>
          <div ref={listTopRef} />
          <EventsListings
            events={searchActive ? searchEvents : filteredEvents}
            isLoading={searchActive ? false : isLoading}
            isError={searchActive ? isSearchError : isError}
            error={searchActive ? searchError : error}
            isFetching={searchActive ? isSearchFetching : isFetching}
            onRetry={
              searchActive ? () => handleSearchSubmit(lastQuery) : refetch
            }
            eventsDate={eventsDate}
          />

          {!searchActive && (
            <PaginationControls
              page={baseMeta.page || page}
              totalPages={baseMeta.totalPages || 1}
              hasPrev={!!baseMeta.hasPrevPage}
              hasNext={!!baseMeta.hasNextPage}
              onPrev={() => goBasePage((baseMeta.page || page) - 1)}
              onNext={() => goBasePage((baseMeta.page || page) + 1)}
              onGo={(p) => goBasePage(p)}
              busy={isFetching}
              selectedDate={eventsDate}
            />
          )}

          <FeaturedEvents events={searchActive ? searchEvents : events} />
        </div>
      </div>
    </section>
  );
};

export default UltraModernEventsPllatform;
