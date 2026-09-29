"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { mapCategories, mapCenter, places } from "@/lib/map-places";

// Satellite imagery with 3D terrain, in the spirit of Google Earth, without an API key:
// Esri World Imagery for the photo layer, AWS/Mapzen Terrarium tiles for elevation, OSM as the street layer.
const center = [mapCenter[1], mapCenter[0]];
const overview = { center, zoom: 13.2, pitch: 0, bearing: 0 };
const closeUp = { center: [124.7788, 1.3178], zoom: 15.4, pitch: 62, bearing: -28 };

const style = {
  version: 8,
  sources: {
    satellite: {
      type: "raster",
      tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
      tileSize: 256,
      maxzoom: 19,
      attribution: "Citra © Esri, Maxar, Earthstar Geographics",
    },
    streets: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      maxzoom: 19,
      attribution: "© OpenStreetMap",
    },
    terrain: {
      type: "raster-dem",
      tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
      encoding: "terrarium",
      tileSize: 256,
      maxzoom: 14,
      attribution: "Elevasi: Mapzen Terrain Tiles",
    },
  },
  layers: [
    { id: "satellite", type: "raster", source: "satellite" },
    { id: "streets", type: "raster", source: "streets", layout: { visibility: "none" } },
  ],
  terrain: { source: "terrain", exaggeration: 1.4 },
  sky: { "sky-color": "#bcd9ef", "horizon-color": "#eef4ea", "sky-horizon-blend": 0.6, "horizon-fog-blend": 0.4 },
};

const escape = (value) => value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

export default function VillageMap() {
  const container = useRef(null);
  const map = useRef(null);
  const [layer, setLayer] = useState("satellite");
  const [threeD, setThreeD] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let observer;

    // MapLibre needs the browser (WebGL), so it loads only on the client.
    import("maplibre-gl").then((module) => {
      // v6 ships named exports only; older builds exposed a default object.
      const maplibregl = module.default ?? module;
      maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
      if (cancelled || !container.current) return;
      const instance = new maplibregl.Map({
        container: container.current,
        style,
        ...overview,
        maxPitch: 75,
        cooperativeGestures: true,
        attributionControl: { compact: true },
        locale: {
          "CooperativeGesturesHandler.WindowsHelpText": "Tekan Ctrl sambil menggulir untuk memperbesar peta",
          "CooperativeGesturesHandler.MacHelpText": "Tekan ⌘ sambil menggulir untuk memperbesar peta",
          "CooperativeGesturesHandler.MobileHelpText": "Gunakan dua jari untuk menggeser peta",
        },
      });
      map.current = instance;
      instance.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
      instance.addControl(new maplibregl.FullscreenControl(), "top-right");
      // Keep the credits collapsed behind the (i) button so they do not cover the map on phones.
      instance.once("idle", () => {
        const credits = container.current?.querySelector(".maplibregl-ctrl-attrib");
        credits?.classList.remove("maplibregl-compact-show");
        credits?.removeAttribute("open");
      });

      for (const place of places) {
        const category = mapCategories[place.category];
        const primary = place.category === "wilayah";
        const element = document.createElement("button");
        element.type = "button";
        element.className = primary ? "map-pin map-pin-main" : "map-pin";
        element.style.setProperty("--pin", category.color);
        element.setAttribute("aria-label", place.name);
        if (primary) element.innerHTML = `<span>Taratara II</span>`;
        new maplibregl.Marker({ element, anchor: primary ? "bottom" : "center" })
          .setLngLat([place.lng, place.lat])
          .setPopup(new maplibregl.Popup({ offset: primary ? 34 : 12, closeButton: false }).setHTML(
            `<strong>${escape(place.name)}</strong><br>${escape(place.note || category.label)}`,
          ))
          .addTo(instance);
      }

      // Fly from the city overview into a tilted 3D view the first time the map is on screen.
      // Not tied to "load": that event waits for every terrain tile and can arrive seconds late.
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reduce) instance.jumpTo(closeUp);
        else instance.flyTo({ ...closeUp, duration: 4200, essential: true });
      }, { threshold: 0.5 });
      observer.observe(container.current);
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      map.current?.remove();
      map.current = null;
    };
  }, []);

  const showLayer = (next) => {
    setLayer(next);
    const instance = map.current;
    if (!instance?.getLayer("satellite")) return;
    instance.setLayoutProperty("satellite", "visibility", next === "satellite" ? "visible" : "none");
    instance.setLayoutProperty("streets", "visibility", next === "streets" ? "visible" : "none");
  };

  const toggle3D = () => {
    const next = !threeD;
    setThreeD(next);
    const instance = map.current;
    if (!instance) return;
    instance.setTerrain(next ? { source: "terrain", exaggeration: 1.4 } : null);
    instance.easeTo(next ? { pitch: closeUp.pitch, bearing: closeUp.bearing } : { pitch: 0, bearing: 0 });
  };

  const reset = () => map.current?.flyTo({ ...(threeD ? closeUp : { ...closeUp, pitch: 0, bearing: 0 }), duration: 1600 });

  const used = [...new Set(places.map((place) => place.category))];

  return (
    <figure className="village-map">
      <div className="village-map-frame">
        <div ref={container} className="village-map-canvas" role="region" aria-label="Peta satelit 3D Kelurahan Taratara II" />
        <div className="map-toolbar" role="toolbar" aria-label="Tampilan peta">
          <div className="map-segment">
            <button type="button" aria-pressed={layer === "satellite"} onClick={() => showLayer("satellite")}>Satelit</button>
            <button type="button" aria-pressed={layer === "streets"} onClick={() => showLayer("streets")}>Peta</button>
          </div>
          <button type="button" aria-pressed={threeD} onClick={toggle3D}>{threeD ? "3D" : "2D"}</button>
          <button type="button" onClick={reset}>Pusatkan</button>
        </div>
      </div>
      <figcaption>
        <ul>
          {used.map((key) => (
            <li key={key}><span style={{ background: mapCategories[key].color }} aria-hidden="true" />{mapCategories[key].label}</li>
          ))}
        </ul>
        <p>Seret untuk menggeser, klik kanan atau dua jari untuk memutar dan memiringkan. Titik ditandai dari data OpenStreetMap; batas resmi kelurahan belum tersedia.</p>
      </figcaption>
    </figure>
  );
}
