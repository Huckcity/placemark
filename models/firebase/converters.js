export const placeConverter = {
  toFirestore: (place) => {
    return {
      name: place.name,
      location: {
        lat: place.location.lat,
        lng: place.location.lng,
      },
      category: place.category,
      userId: place.userId,
    };
  },

  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Place(data);
  },
};
