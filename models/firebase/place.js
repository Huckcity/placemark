class Place {
  constructor(place, userId) {
    this.name = place.name;
    this.location = {
      lat: place.latitude,
      lng: place.longitude,
    };
    this.description = place.description;
    this.category = place.category;
    this.userId = userId;
  }
}
export default Place;
