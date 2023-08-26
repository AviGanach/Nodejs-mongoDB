const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

router.get("/", getAllCategories);
router.post("/", createCategory);
router.get("/:idCategory", getCategory);
router.patch("/:idCategory", updateCategory);
router.delete("/:idCategory", deleteCategory);

module.exports = router;
