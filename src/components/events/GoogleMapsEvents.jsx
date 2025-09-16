import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// fix default icons for bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function isValidCoord(lat, lng) {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

function normalizeEvents(input) {
  const list = Array.isArray(input)
    ? input
    : Array.isArray(input?.data)
    ? input.data
    : [];

  return list
    .map((e) => {
      const coords =
        e?.event_coordinates || e?.eventCoordinates || e?.coordinates || {};

      const title =
        typeof e?.title === "string" && e.title.trim() ? e.title.trim() : "";
      const lat = parseFloat(coords.lat);
      const lng = parseFloat(coords.long ?? coords.lng);
      if (!isValidCoord(lat, lng)) return null;

      return {
        id: e?._id || e?.id || crypto?.randomUUID?.() || String(Math.random()),
        address: e?.address || e?.location || "",
        datetime: e?.datetime || "",
        website: e?.website || "",
        lat,
        lng,
        title,
      };
    })
    .filter(Boolean);
}

function FitToMarkers({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (!positions?.length) return;
    if (positions.length === 1) {
      map.setView(positions[0], 12, { animate: true });
    } else {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [positions, map]);
  return null;
}

export default function GoogleMapsEvents({
  events,
  height = 500,
  fallbackCenter = [24.8607, 67.0011],
  tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}) {
  // LOG INPUT whenever it changes
  useEffect(() => {
    console.log("events prop ->", events);
  }, [events]);

  const normalized = useMemo(() => normalizeEvents(events), [events]);
  useEffect(() => {
    console.log("normalized ->", normalized);
  }, [normalized]);
  // LOG OUTPUT whenever it changes
  useEffect(() => {
    console.log("normalized ->", normalized);
  }, [normalized]);

  const positions = normalized.map((ev) => [ev.lat, ev.lng]);

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

        {normalized.map((ev) => (
          <Marker key={ev.id} position={[ev.lat, ev.lng]}>
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

        {!normalized.length && (
          <Marker position={fallbackCenter}>
            <Popup>No valid event coordinates found.</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
