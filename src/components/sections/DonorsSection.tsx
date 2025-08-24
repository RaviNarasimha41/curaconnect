// src/components/sections/DonorsSection.tsx
import { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

// --- Fix Leaflet marker icons for Vite ---
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// --- Cities with coords ---
const cities = [
  { name: "Vizag", lat: 17.6868, lng: 83.2185 },
  { name: "Hyderabad", lat: 17.385, lng: 78.4867 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function DonorsSection() {
  // Randomize initial donors
  const initialData = useMemo(
    () =>
      cities.map((c) => ({
        location: c.name,
        donors: randomInt(50, 220),
      })),
    []
  );

  const [data, setData] = useState(initialData);

  // Simulate live updates every 3s
  useEffect(() => {
    const t = setInterval(() => {
      setData((prev) =>
        prev.map((d) => ({
          ...d,
          donors: Math.max(20, d.donors + randomInt(-15, 15)),
        }))
      );
    }, 3000);
    return () => clearInterval(t);
  }, []);

  // Add donor counts to markers
  const markers = cities.map((c) => {
    const d = data.find((x) => x.location === c.name)?.donors ?? 0;
    return { ...c, donors: d };
  });

  return (
    <section id="donors" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Available Donors — Live Overview
        </h2>
        <p className="text-gray-600 text-center mb-10">
          See donors on the map and watch real-time analytics update.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* MAP */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-lg font-semibold mb-3">Map</h3>
            <div className="h-[420px] w-full rounded-xl overflow-hidden">
              <MapContainer
                center={[17.6868, 83.2185]} // Vizag
                zoom={6}
                scrollWheelZoom={false}
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                {markers.map((m) => (
                  <Marker key={m.name} position={[m.lat, m.lng]}>
                    <Popup>
                      <div className="text-sm">
                        <b>{m.name}</b>
                        <br />
                        Available donors: {m.donors}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* ANALYTICS */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-lg font-semibold mb-3">Analytics</h3>

            <div className="space-y-8">
              {/* Bar chart */}
              <div>
                <h4 className="font-medium mb-2">Donors by City</h4>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="location" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="donors"
                      fill="#3b82f6"
                      animationDuration={700}
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Line chart */}
              <div>
                <h4 className="font-medium mb-2">Trend Snapshot</h4>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="location" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="donors"
                      stroke="#ef4444"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          Values randomize on refresh and gently update every few seconds to
          simulate live data.
        </p>
      </div>
    </section>
  );
}
