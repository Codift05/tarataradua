"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { mapCategories, mapCenter, places } from "@/lib/map-places";

const escape = (value) => value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

export default function VillageMap() {
  const container = useRef(null);

  useEffect(() => {
    let map;
    let cancelled = false;

    // Leaflet touches `window` on import, so it loads only in the browser.
    import("leaflet").then(({ default: L }) => {
      if (cancelled || !container.current) return;
      map = L.map(container.current, { center: mapCenter, zoom: 16, scrollWheelZoom: false, attributionControl: true });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      for (const place of places) {
        const category = mapCategories[place.category];
        const primary = place.category === "wilayah";
        L.circleMarker([place.lat, place.lng], {
          radius: primary ? 11 : 7,
          color: "#fff",
          weight: 2,
          fillColor: category.color,
          fillOpacity: 1,
        })
          .bindPopup(`<strong>${escape(place.name)}</strong><br>${escape(place.note || category.label)}`)
          .addTo(map);
      }
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  const used = [...new Set(places.map((place) => place.category))];

  return (
    <figure className="village-map">
      <div ref={container} className="village-map-canvas" role="region" aria-label="Peta lokasi Kelurahan Taratara II" />
      <figcaption>
        <ul>
          {used.map((key) => (
            <li key={key}><span style={{ background: mapCategories[key].color }} aria-hidden="true" />{mapCategories[key].label}</li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
