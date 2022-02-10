const Product = require("../../models/Product");

// how would an error occur in fetching?
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    // return res.status(500).json({ message: error.message });
    next(error);
  }
};

exports.productFetch = async (productId, next) => {
  try {
    const product = await Product.findById(productId);
    if (product) return product;
    else {
      const err = new Error("Product Not Found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    console.log(req.file);
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}}`;
    }
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    // return res.status(500).json({ message: error.message });
    next(error);
  }
};

exports.productDelete = async (req, res, next) => {
  try {
    const productId = req.product._id;
    await Product.findByIdAndRemove({ _id: productId });
    res.status(204).end();
  } catch (error) {
    // return res.status(500).json({ message: error.message });
    next(error);
  }
};

exports.productUpdate = async (req, res, next) => {
  try {
    console.log(req.file);
    console.log(req.body);
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}}`;
    }
    const productId = req.product._id;
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: productId },
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
