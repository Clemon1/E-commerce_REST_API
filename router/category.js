const router = require("express").Router();
const category = require("../model/categoryModel");
const role = require("../middleware/authRoles");

// Get all Categories
router.get("/category/all", async (req, res) => {
  try {
    const allCategory = await category.find();
    res.status(200).json(allCategory);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get a single Category
router.get("/category/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const findCategory = await category.findById({ id });
    res.status(200).json(findCategory);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Create a New category
router.post("/category/create-new", async (req, res, next) => {
  try {
    const newCategory = new category({
      name: req.body.name,
      image: req.body.image,
    });
    const itemCategory = await newCategory.save();
    res.status(200).json(itemCategory);
    next();
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Updating a category
router.put("/category/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateCategory = await category.findByIdAndUpdate(id, {
      $set: req.body,
    });
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Delete a category
router.delete("/category/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteCategory = await category.findByIdAndRemove(id);
    res.status(200).json("Category deleted succesfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
});
module.exports = router;
