import React, {
  useMemo,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const isValidCoord = (lat, lng) =>
  Number.isFinite(lat) &&
  Number.isFinite(lng) &&
  lat >= -90 &&
  lat <= 90 &&
  lng >= -180 &&
  lng <= 180;

const truncate = (s, max = 20) => {
  const str = (s || "").trim();
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
};

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

function ZoomWatcher({ onZoomInit, onZoomChange }) {
  const map = useMap();
  const initRef = useRef(false);

  useEffect(() => {
    if (!initRef.current) {
      const z = map.getZoom();
      onZoomInit?.(z);
      onZoomChange?.(z);
      initRef.current = true;
    }
    const handle = () => onZoomChange?.(map.getZoom());
    map.on("zoomend", handle);
    return () => map.off("zoomend", handle);
  }, [map, onZoomInit, onZoomChange]);

  return null;
}

function FitToMarkers({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (!positions?.length) return;
    if (positions.length === 1)
      map.setView(positions[0], 12, { animate: true });
    else map.fitBounds(L.latLngBounds(positions), { padding: [40, 40] });
  }, [positions, map]);
  return null;
}

export default function GoogleMapsEvents({
  allTalentsEvents,
  filteredEventsByCalendar,
  height = 500,
  fallbackCenter = [24.8607, 67.0011],
  tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  labelScaleFactor = 1.2,
  labelMinZoom,
}) {
  const normalizedFiltered = useMemo(
    () => normalizeEvents(filteredEventsByCalendar),
    [filteredEventsByCalendar]
  );
  const normalizedAll = useMemo(
    () => normalizeEvents(allTalentsEvents),
    [allTalentsEvents]
  );
  const events = normalizedFiltered.length ? normalizedFiltered : normalizedAll;

  const positions = useMemo(
    () => events.map((ev) => [ev.lat, ev.lng]),
    [events]
  );

  const [zoom, setZoom] = useState(5);
  const [baseZoom, setBaseZoom] = useState(5);

  const handleZoomInit = useCallback((z) => setBaseZoom(z), []);
  const handleZoomChange = useCallback((z) => setZoom(z), []);
  const computedMin =
    typeof labelMinZoom === "number"
      ? labelMinZoom
      : Math.ceil(baseZoom + Math.log2(labelScaleFactor));

  const showLabels = zoom >= computedMin;

  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ height }}>
      <MapContainer
        className="w-full h-full"
        center={positions[0] || fallbackCenter}
        zoom={5}
        style={{}}
      >
        <ZoomWatcher
          onZoomInit={handleZoomInit}
          onZoomChange={handleZoomChange}
        />
        <TileLayer url={tileUrl} attribution={attribution} />
        <FitToMarkers positions={positions} />

        {events.map((ev) => (
          <Marker key={ev.id} position={[ev.lat, ev.lng]}>
            {showLabels && ev.title && (
              <Tooltip
                permanent
                direction="top"
                offset={[0, -28]}
                opacity={1}
                className="event-label"
              >
                {truncate(ev.title, 20)}
              </Tooltip>
            )}

            <Popup>
              <div style={{ maxWidth: 240 }}>
                <strong>{ev.title}</strong>
                {ev.address && (
                  <div style={{ fontSize: 12, marginTop: 4 }}>{ev.address}</div>
                )}
                {ev.datetime && (
                  <div style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>
                    {new Date(ev.datetime).toLocaleString()}
                  </div>
                )}
                {ev.website && (
                  <div style={{ marginTop: 6 }}>
                    <a href={ev.website} target="_blank" rel="noreferrer">
                      Website
                    </a>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {!events.length && (
          <Marker position={fallbackCenter}>
            <Popup>No events with valid coordinates to show.</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
