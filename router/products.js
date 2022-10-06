const router = require("express").Router();
const products = require("../model/productModel");
const category = require("../model/categoryModel");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//Viewing all product
router.get("/product/all", async (req, res) => {
  try {
    const findProduct = await products.find().populate("category").exec();
    res.status(200).json(findProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
//Viewing a single product
router.get("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const singleProduct = await products
      .findById(id)
      .populate("category")
      .exec();
    res.status(200).json(singleProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Viewing products based on their category
router.get("/product/category/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cat = await category.findById(id);

    const productCategory = await products.find({ category: cat._id });
    res.status(200).json(productCategory);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ADMIN PART

// Creating a new product
router.post(
  "/product/create-product",
  upload.single("Image"),
  async (req, res) => {
    try {
      const product = new products(req.body);
      const savedProduct = await product.save();

      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
);

// Update a product
router.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const updateProduct = await products.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true },
    );
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Delete a Product
router.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const deletedProduct = await products.findByIdAndDelete(id);
    res.status(200).json("Product Deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
