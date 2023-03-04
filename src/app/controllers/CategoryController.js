const CategoryRepository = require("../repositories/CategoriesRepository");

class CategoryController {
  // ignore
  async index(req, res) {
    const { orderBy } = req.query;

    const categories = await CategoryRepository.findAll(orderBy);

    res.send(categories);
  }

  async show(req, res) {
    const { id } = req.params;

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.send(category);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });

    const categoryExists = await CategoryRepository.findByName(name);

    if (categoryExists) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const category = await CategoryRepository.create({ name });

    res.send(category);
  }

  async update(req, res) {
    const { name } = req.body;

    const { id } = req.params;

    const category = await CategoryRepository.findByName(name);

    if (category) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const updatedCategory = await CategoryRepository.update(id, { name });

    res.send(updatedCategory);
  }

  async delete(req, res) {
    const { id } = req.params;

    await CategoryRepository.delete(id);

    res.send();
  }
}

module.exports = new CategoryController();
