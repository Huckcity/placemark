import Category from "./category.js";

const categoryStore = {
  async getAll() {
    const categories = await Category.find({}).lean();
    return categories;
  },

  async getById(id) {
    const category = await Category.findById(id).lean();
    return category;
  },

  async getByName(name) {
    const category = await Category.findOne({ name }).lean();
    return category;
  },

  async create(category) {
    const newCategory = new Category(category);
    newCategory.slug_name = category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await newCategory.save();
    const savedCategory = await this.getById(newCategory._id);
    return savedCategory;
  },

  async update(categoryId, category) {
    await Category.findByIdAndUpdate(categoryId, category);
    const savedCategory = await this.getById(categoryId);
    return savedCategory;
  },

  async delete(categoryId) {
    await Category.findByIdAndDelete(categoryId);
    return true;
  },

  async deleteAll() {
    const res = await Category.deleteMany({});
    return res;
  },
};

export default categoryStore;
