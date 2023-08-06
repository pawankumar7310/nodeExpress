const model = require("../model/product");
const Products = model.product;
const chalk = require("chalk");

// ------------------------------------------------------
//create products
exports.createProduct = async (req, resp) => {
  try {
    const product = new Products(req.body);
    const doc = await product.save();
    console.log({ doc });
    resp.status(201).json(doc);
  } catch (err) {
    console.log(
      chalk.black.bgYellow(err?.errors?.price?.message ?? "data wrong hai")
    );
    resp.status(404).json(err);
  }
};
//---------------------------------------------------------

// --------------------------------------------------------
//read
exports.getAllProducts = async (req, resp) => {
  const products = await Products.find();
  resp.status(200).json(products);
};

//read one
exports.getProduct = async (req, resp) => {
  const id = req.params.id;
  try {
    const product = await Products.findById(id);
    resp.status(200).json(product);
  } catch (error) {
    console.log(chalk.black.bgYellow(error.messageFormat ?? "Id is Wrong"));
    resp.status(404).json("wrong id ");
  }
};
// --------------------------------------------------------
// --------------------------------------------------------
//PUT update
exports.replaceProduct = async (req, resp) => {
  const id = req.params.id;
  try {
    const doc = await Products.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    resp.status(200).json(doc);
  } catch (error) {
    resp.status(404).json(error);
  }
};

// PATCH update
exports.updateProduct = async (req, resp) => {
  const id = req.params.id;
  try {
    const doc = await Products.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    resp.status(201).json(doc);
  } catch (error) {
    resp.status(404).json(error);
  }
};
// --------------------------------------------------------
// --------------------------------------------------------
//delete
exports.deleteProduct = async (req, resp) => {
  const id = req.params.id;
  try {
    const doc = await Products.findOneAndDelete({ _id: id });
    resp.status(200).json(doc);
  } catch (error) {
    resp.status(404).json(error);
  }
};
