const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const checkAuth = require("../middlewares/checkAuth");

const {
  getAllArticles,
  createArticle,
  getArticles,
  updateArticle,
  deleteArticle,
} = require("../controllers/articles");

router.get("/", getAllArticles);
router.get("/:idArticle", getArticles);
router.post("/", checkAuth, upload.single('image'), createArticle);
router.patch("/:idArticle", checkAuth, updateArticle);
router.delete("/:idArticle", checkAuth, deleteArticle);

module.exports = router;
