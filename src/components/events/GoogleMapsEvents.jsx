import React, { useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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

const normalizeEvents = (input) => {
  const list = Array.isArray(input)
    ? input
    : Array.isArray(input?.data)
    ? input.data
    : [];

  return list
    .map((e) => {
      // Support both e.coordinates.{lat,long|lng} and top-level e.{lat,lng}
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

function FitToMarkers({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (!positions?.length) return;
    if (positions.length === 1) {
      map.setView(positions[0], 12, { animate: true });
    } else {
      map.fitBounds(L.latLngBounds(positions), { padding: [40, 40] });
    }
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

  return (
    <div
      style={{ height, width: "100%", borderRadius: 12, overflow: "hidden" }}
    >
      <MapContainer
        center={positions[0] || fallbackCenter}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url={tileUrl} attribution={attribution} />
        <FitToMarkers positions={positions} />

        {events.map((ev) => (
          <Marker key={ev.id} position={[ev.lat, ev.lng]}>
            <Popup>
              <div style={{ maxWidth: 240 }}>
                <strong>{ev.title || "Untitled Event"}</strong>
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
