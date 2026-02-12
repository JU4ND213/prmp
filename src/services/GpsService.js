export function startGps(onUpdate) {
  if (!navigator.geolocation) {
    console.warn("Geolocation no soportado");
    return;
  }

  return navigator.geolocation.watchPosition(
    (pos) => {
      onUpdate({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    },
    (err) => console.error("GPS error:", err),
    {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 10000,
    }
  );
}

