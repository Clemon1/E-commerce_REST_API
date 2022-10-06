const router = require("express").Router();
const cart = require("../model/cartModel");
const User = require("../model/userModel");

// Get a single user cart
router.get("/cart/get-cart", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user._id === req.body) {
      const viewCart = await cart.find({ userId: user._id });
      res.status(200).json(viewCart);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// add to cart
router.post("/cart/add-to-cart", async (req, res) => {
  try {
    const addCart = new cart(req.body);
    const savedCart = await addCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Deletes an item in the cart

router.delete("/cart/remove-cart", async (req, res) => {
  try {
    const id = req.params.id;
    await cart.findByIdAndDelete(id);
    res.status(200).json("Item removed from the cart");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
