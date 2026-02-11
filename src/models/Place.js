export class Place {
  constructor(id, name, lat, lng) {
    this.id = id;
    this.name = name;
    this.lat = lat;
    this.lng = lng;
  }
}

export const PLACES = [
  new Place(1, "Monumento Central", -0.00202, -78.45572),
  new Place(2, "Parque Histórico", -0.00350, -78.45710),
  new Place(3, "Museo Local", -0.00120, -78.45400),
];
