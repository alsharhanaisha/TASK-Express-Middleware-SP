const express = require("express");
const cors = require("cors");
const connectDb = require("./database");
const productsRoutes = require("./api/products/routes");
const { application, urlencoded } = require("express");

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded());

// Middlewares

// Method + URL used:
app.use((res, req, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

// Routes
app.use("/api/products", productsRoutes);

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

app.listen(process.env.PORT || 8000);
connectDb();
