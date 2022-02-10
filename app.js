const express = require("express");
const cors = require("cors");
const connectDb = require("./database");
const productsRoutes = require("./api/products/routes");
const { application, urlencoded } = require("express");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares

// Method + URL used:
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});
// Routes
app.use("/api/products", productsRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

// Error handling Middleware:
app.use((err, req, res, next) => {
  return res
    .status(error.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

// Path not found:
app.use((req, res, next) => {
  res.status(404).json("Path Not Found");
});

app.listen(process.env.PORT || 3000);
connectDb();
