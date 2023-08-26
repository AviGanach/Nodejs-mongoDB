const mongoose = require("mongoose");
const Article = require("../models/article");
const Category = require("../models/category");


module.exports = {
  getAllArticles: (req, res) => {
    try {
      Article.find()
        .populate("categoryId", "title")
        .then((articles) => res.status(200).json({ articles }));
    } catch (error) {
      console.log(error);
      res.status(404);
      res.json({ message: "error" });
    }
  },
  createArticle: (req, res) => {
    console.log(req.file);
    const { path: image } = req.file
    const { title, description, content, categoryId } = req.body;
    Category.findById(categoryId)
      .then((category) => {
        if (!category) {
          return res.status(404).json({
            mas: "Category not found",
          });
        }

        const article = new Article({
          _id: new mongoose.Types.ObjectId(),
          title,
          description,
          content,
          categoryId,
          image: image.replace('\\','/'),
        });

        return article.save();
      })
      .then(() => {
        res.status(200).json({
          mas: "created article",
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 11000) {
        return res.status(500).json("already exist")
        }
        res.status(500);
        res.json({ message: error });
      });
  },
  getArticles: (req, res) => {
    const idArticle = req.params.idArticle;
    Article.findById(idArticle)
      .populate("categoryId", "title")
      .then((article) => {
        res.status(200).json({
          article,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(404);
        res.json({ message: error + 22 });
      });
  },
  updateArticle: async (req, res) => {
    try {
      const idArticle = req.params.idArticle;
      const { categoryId } = req.body;

      const article = await Article.findById(idArticle);
      if (!article) {
        return res.status(404).json({
          message: "Article not found",
        });
      }

      if (categoryId) {
        console.log("AVI 1");
        const category = await Category.findById(categoryId);
        console.log("AVI 2");
        if (!category) {
          console.log("AVI 3");
          return res.status(404).json({
            message: "Category not found",
          });
        }
        console.log("AVI 4");
        await Article.updateOne({ _id: idArticle }, req.body);
      } else {
        await Article.updateOne({ _id: idArticle }, req.body);
      }

      res.status(200).json({
        message: "Article updated",
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  deleteArticle: async (req, res) => {
    const idArticle = req.params.idArticle;

    try {
      const article = await Article.findOneAndRemove({ _id: idArticle });
      if (!article) {
        return res.status(404).json({
          message: "Article not found",
        });
      }

      res.status(200).json({ mas: `article _id: ${idArticle} deleted` });
    } catch {
      (error) => {
        console.log(error);
        res.status(500);
        res.json({ error: error });
      };
    }
  },
};
