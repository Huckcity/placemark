import Category from "./category.js";
import { slugify } from "../../helpers/utils.js";

const categoryStore = {
  async getAll() {
    const categories = await Category.find({}).lean();
    return categories;
  },

  async getById(id) {
    if (!id) {
      throw new Error("Category id is required.");
    }
    const category = await Category.findById(id).lean();
    if (!category) {
      throw new Error(`Category with id ${id} not found.`);
    }
    return category;
  },

  async getByName(name) {
    const category = await Category.findOne({ name }).lean();
    if (!category) {
      return null;
    }
    return category;
  },

  async create(category) {
    const newCategory = new Category(category);
    newCategory.slug_name = slugify(category.name);
    await newCategory.save();
    const savedCategory = await this.getById(newCategory._id);
    return savedCategory;
  },

  async update(categoryId, category) {
    if (!categoryId) {
      throw new Error("Category id is required.");
    }
    if (!category) {
      throw new Error("Category is required.");
    }
    if (!category.name) {
      throw new Error("Category name is required.");
    }
    await Category.findByIdAndUpdate(categoryId, category);
    const savedCategory = await this.getById(categoryId);
    return savedCategory;
  },

  async delete(categoryId) {
    if (!categoryId) {
      throw new Error("Category id is required.");
    }
    try {
      await Category.findByIdAndDelete(categoryId);
      return true;
    } catch (err) {
      throw new Error(err);
    }
  },

  async deleteAll() {
    const res = await Category.deleteMany({});
    return res;
  },
};

export default categoryStore;
