import React, { useEffect, useRef, useState } from "react";

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
  const mapRef = useRef(null);
  const [filter, setFilter] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!window.google || mapLoaded) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: -29.85, lng: 24.0 },
      zoom: 5,
    });

    const trafficLayer = new window.google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    sampleSites.forEach((site) => {
      if (
        site.siteName.toLowerCase().includes(filter.toLowerCase()) ||
        site.mediaOwner.toLowerCase().includes(filter.toLowerCase())
      ) {
        const marker = new window.google.maps.Marker({
          position: { lat: site.lat, lng: site.lng },
          map,
          title: site.siteName,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <strong>${site.siteName}</strong><br/>
            ${site.mediaOwner}<br/>
            ${site.format}<br/>
            Visibility Score: ${site.visibility}
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      }
    });

    setMapLoaded(true);
  }, [filter, mapLoaded]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", background: "#f0f0f0" }}>
        <h2>🗺️ DOOH Planner with Live Traffic</h2>
        <input
          placeholder="Filter by Media Owner or Site Name"
          value={filter}
          onChange={(e) => {
            setMapLoaded(false); // Force re-init
            setFilter(e.target.value);
          }}
          style={{
            padding: "8px",
            width: "300px",
            marginTop: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div ref={mapRef} style={{ flex: 1 }} />
    </div>
  );
}

export default App;
