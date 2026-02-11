export function startGps(onUpdate) {
  if (!("geolocation" in navigator)) {
    console.warn("Geolocation no soportado");
    return;
  }

  return navigator.geolocation.watchPosition(
    (pos) => {
      onUpdate([
        pos.coords.longitude,
        pos.coords.latitude
      ]);
    },
    (err) => console.warn("GPS error:", err),
    { enableHighAccuracy: true }
  );
}

