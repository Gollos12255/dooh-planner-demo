import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const sampleSites = [
  {
    mediaOwner: "JCDecaux",
    siteName: "Sandton LED",
    location: "Sandton, Johannesburg",
    lat: -26.1076,
    lng: 28.0567,
    format: "Digital Billboard",
    visibility: 85,
  },
  {
    mediaOwner: "Tractor Outdoor",
    siteName: "Sea Point LED",
    location: "Sea Point, Cape Town",
    lat: -33.918,
    lng: 18.3845,
    format: "Digital Billboard",
    visibility: 90,
  },
  {
    mediaOwner: "Face First Media",
    siteName: "Durban Beachfront Wrap",
    location: "Durban Central",
    lat: -29.8579,
    lng: 31.0292,
    format: "Digital Wrap",
    visibility: 80,
  },
];

function App() {
  const [filter, setFilter] = useState("");

  const filteredSites = sampleSites.filter(
    (site) =>
      site.siteName.toLowerCase().includes(filter.toLowerCase()) ||
      site.mediaOwner.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", background: "#f0f0f0" }}>
        <h2>📍 DOOH Planner Demo</h2>
        <input
          placeholder="Filter by Media Owner or Site Name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "8px",
            width: "300px",
            marginTop: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <MapContainer center={[-29.85, 24.0]} zoom={5} style={{ flex: 1 }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredSites.map((site, idx) => (
          <Marker key={idx} position={[site.lat, site.lng]}>
            <Popup>
              <strong>{site.siteName}</strong><br />
              Owner: {site.mediaOwner}<br />
              Format: {site.format}<br />
              Visibility Score: {site.visibility}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
