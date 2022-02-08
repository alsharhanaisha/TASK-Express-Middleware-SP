const express = require("express");

const {
  getProducts,
  productCreate,
  productDelete,
  productUpdate,
  productFetch,
} = require("./controllers");

const router = express.Router();

// Middleware:
router.param("productId", async (req, res, next, prodId) => {
  const product = await productFetch(prodId, next);
  req.product = product;
  next();
});

router.get("/", getProducts);
router.post("/", productCreate);
router.delete("/:productId", productDelete);
router.put("/:productId", productUpdate);

module.exports = router;
