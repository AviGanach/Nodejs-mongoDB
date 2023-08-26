const mongoose = require("mongoose");
const Category = require("../models/category");

module.exports = {
  getAllCategories: (req, res) => {
    try {
      Category.find().then((categories) =>
        res.status(200).json({ categories })
      );
    } catch (error) {
      console.log(error);
      res.status(404);
      res.json({ message: "error" });
    }
  },
  createCategory: (req, res) => {
    console.log("AVI");
    const { title, description } = req.body;
    console.log(title);
    const category = new Category({
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
    });

    category
      .save()
      .then(() => {
        res.status(200).json({
          mas: "created category",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(404);
        res.json({ message: "error" });
      });
  },
  getCategory: (req, res) => {
    const idCategory = req.params.idCategory;
    Category.findById(idCategory)
      .then((category) => {
        res.status(200).json({
          category,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(404);
        res.json({ message: error + 22 });
      });
  },
  updateCategory: async (req, res) => {
    try {
      const idCategory = req.params.idCategory;

      const category = await Category.findById(idCategory);

      if (!category) {
        return res.status(404).json({
          message: "category not found",
        });
      }
      
      Category.updateOne({ _id: idCategory }, req.body).then((newCategory) => {
        console.log(newCategory);
        res
          .status(200)
          .json({
            acknowledged: newCategory.acknowledged,
            modifiedCount: newCategory.modifiedCount,
            mas: `category id ${idCategory} updated`,
          });
      });
    } catch (error) {
      console.log(error);
      res.status(404);
      res.json({ error });
    }
  },
  deleteCategory: async (req, res) => {
    const idCategory = req.params.idCategory;

    const category = await Category.findById(idCategory);

      if (!category) {
        return res.status(404).json({
          message: "category not found",
        });
      }

    Category.findOneAndRemove({ _id: idCategory })
      .exec()
      .then(() => {
        res.status(200).json({ mas: `Category _id: ${idCategory} deleted` });
      })
      .catch((error) => {
        console.log(error);
        res.status(404);
        res.json({ error: error });
      });
  },
};
