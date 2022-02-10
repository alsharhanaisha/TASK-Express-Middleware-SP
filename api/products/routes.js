const express = require("express");

const {
  getProducts,
  productCreate,
  productDelete,
  productUpdate,
  productFetch,
} = require("./controllers");

const router = express.Router();

const upload = require("../../middleware/multer");

// Middleware:
router.param("productId", async (req, res, next, prodId) => {
  const product = await productFetch(prodId, next);
  req.product = product;
  next();
});

router.get("/", getProducts);
router.post("/", upload.single("image"), productCreate);
router.delete("/:productId", productDelete);
router.put("/:productId", upload.single("image"), productUpdate);

module.exports = router;
