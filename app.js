const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter = require("./router/authRoutes");
const categoryRouter = require("./router/category");
const productRouter = require("./router/products");
const cartRouter = require("./router/cart");
const app = express();
// Connecting to MongoDB database
mongoose.connect("mongodb://localhost:27017/FoodDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => {
  console.log("Error connecting to database");
});
db.once("open", () => {
  console.log("Database Connected"); // Connection Established
});
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/auth", authRouter);
app.use("/foodie", categoryRouter);
app.use("/products", productRouter);
app.use("/items", cartRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
