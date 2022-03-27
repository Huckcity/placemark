import { Review } from "./review.js";

const reviewMongoStore = {
  async getAll() {
    const reviews = await Review.find({}).populate("user").populate("place").lean();
    return reviews;
  },

  async getById(id) {
    const review = await Review.findById(id).populate("user").populate("place").lean();
    return review;
  },

  async getByPlaceId(placeId) {
    const reviews = await Review.find({ place: placeId }).populate("user").populate("place").lean();
    return reviews;
  },

  async getByUserId(userId) {
    const reviews = await Review.find({ user: userId }).populate("user").populate("place").lean();
    return reviews;
  },

  async create(userId, placeId, review) {
    const newReview = new Review({
      rating: review.rating,
      comment: review.comment,
      user: userId,
      place: placeId,
    });
    await newReview.save();
    const reviewCreated = await Review.findOne({ _id: newReview._id }).lean();
    return reviewCreated;
  },

  async delete(id, userId) {
    const review = await Review.findById(id);
    if (review.user != userId) {
      throw new Error("You can only delete your own reviews");
    }
    return Review.findByIdAndDelete(id).lean();
  },

  async deleteAll() {
    return Review.deleteMany({});
  },
};

export default reviewMongoStore;
