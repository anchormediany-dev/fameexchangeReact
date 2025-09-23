import React, {
  useMemo,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";

const isValidCoord = (lat, lng) =>
  Number.isFinite(lat) &&
  Number.isFinite(lng) &&
  lat >= -90 &&
  lat <= 90 &&
  lng >= -180 &&
  lng <= 180;

const normalizeEvents = (input) => {
  const list = Array.isArray(input)
    ? input
    : Array.isArray(input?.data)
    ? input.data
    : [];
  return list
    .map((e) => {
      const c = e?.coordinates || {};
      const lat = parseFloat(c.lat ?? e?.lat);
      const lng = parseFloat(c.long ?? c.lng ?? e?.lng);
      if (!isValidCoord(lat, lng)) return null;
      const title = (e?.title || "").toString().trim();
      return {
        id: e?._id || e?.id || `${lat},${lng},${title}`,
        title,
        address: e?.address || e?.location || "",
        datetime: e?.datetime || "",
        website: e?.website || "",
        lat,
        lng,
      };
    })
    .filter(Boolean);
};

const containerStyle = { width: "100%", height: "100%" };

// Function to get the first character or two for the label
const getLabelText = (title) => {
  if (!title) return "•";
  return title.substring(0, 20).toUpperCase();
};

export default function GoogleMapsEvents({
  allTalentsEvents,
  filteredEventsByCalendar,
  height = 650,
  fallbackCenter = [43.0, -75.0],
  tileUrl,
  attribution,
  labelScaleFactor,
  labelMinZoom,
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });

  const normalizedFiltered = useMemo(
    () => normalizeEvents(filteredEventsByCalendar),
    [filteredEventsByCalendar]
  );
  const normalizedAll = useMemo(
    () => normalizeEvents(allTalentsEvents),
    [allTalentsEvents]
  );
  const events = normalizedFiltered.length && normalizedFiltered;

  const defaultCenter = useMemo(() => {
    if (events.length) return { lat: events[0].lat, lng: events[0].lng };
    return { lat: fallbackCenter[0], lng: fallbackCenter[1] };
  }, [events, fallbackCenter]);
  const [zoom, setZoom] = useState(5);
  const handleZoomChanged = useCallback(() => {
    const m = mapRef.current;
    if (m) setZoom(m.getZoom());
  }, []);

  const mapRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!events.length) {
      map.setCenter(defaultCenter);
      map.setZoom(5);
      return;
    }

    if (events.length === 1) {
      map.setCenter({ lat: events[0].lat, lng: events[0].lng });
      map.setZoom(12);
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    events.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds, 40);
  }, [events, defaultCenter]);

  if (loadError) {
    return (
      <div className="w-full rounded-xl overflow-hidden h-[400px] lg:h-[650px] flex items-center justify-center">
        <div className="text-sm text-red-600">
          Failed to load Google Maps. Check your API key & billing.
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full rounded-xl overflow-hidden h-[400px] lg:h-[650px] flex items-center justify-center">
        <div className="text-sm opacity-70">Loading map…</div>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-xl overflow-hidden h-[400px] lg:h-[650px] text-black"
      style={{ height }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          // simple default Google map with standard controls
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          gestureHandling: "greedy",
          scrollwheel: true,
          mapTypeId: "roadmap",
        }}
      >
        {/* Markers with labels */}
        {(events.length
          ? events
          : [
              {
                id: "fallback",
                title: "Default Location",
                address: "",
                lat: fallbackCenter[0],
                lng: fallbackCenter[1],
              },
            ]
        ).map((ev) => {
          const pos = { lat: ev.lat, lng: ev.lng };
          const isOpen = selectedId === ev.id;
          const labelText = getLabelText(ev.title);

          return (
            <React.Fragment key={ev.id}>
              <Marker
                position={pos}
                onClick={() => setSelectedId(ev.id)}
                // label={{
                //   text: labelText,
                //   color: "#000",
                //   fontSize: "12px",
                //   fontWeight: "bold",
                //   className: "marker-label",
                // }}
                title={ev.title} // This shows as tooltip on hover
              />
              {isOpen && (
                <InfoWindow
                  position={pos}
                  onCloseClick={() => setSelectedId(null)}
                >
                  <div style={{ maxWidth: 240 }}>
                    <Link to={`/event-details/${ev?.id}`}>
                      <strong className="underline">
                        {ev.title || "Location"}
                      </strong>
                    </Link>
                    {ev.address && (
                      <div style={{ fontSize: 12, marginTop: 4 }}>
                        {ev.address}
                      </div>
                    )}
                    {ev.datetime && (
                      <div style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>
                        {new Date(ev.datetime).toLocaleString()}
                      </div>
                    )}
                    {ev.website && (
                      <div style={{ marginTop: 6 }}>
                        <a
                          href={ev.website}
                          target="_blank"
                          className="underline text-blue-400"
                          rel="noreferrer"
                        >
                          Website
                        </a>
                      </div>
                    )}
                  </div>
                </InfoWindow>
              )}
            </React.Fragment>
          );
        })}
      </GoogleMap>
    </div>
  );
}
