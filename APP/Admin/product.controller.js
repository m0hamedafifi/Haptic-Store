const Product = require("../models/products.model");
const Image = require("../models/images.model");
const util = require("../util/utility");

//-----------------------------------------
// 1. Add new product
//----------------------------------------

exports.addProduct = async (req, res) => {
  try {
    // 1.1. Create a new product object
    let product = new Product({
      productId: req.body.productId,
      productName: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      categoryId: req.body.categoryId,
      createdBy: req.body.createdBy,
      totalRate: 0,
      tags: req.body.tags,
      discountId: req.body.discountId,
    });

    // 1.2. Save the product to the database
    const newProduct = new Product(product);
    const resultProduct = await newProduct.save();

    // 1.3. Create a new image object
    let image = new Image({
      imgId: util.generateUniqueId(),
      productId: product.productId,
      url: req.body.url,
      createdOn: util.dateFormat(),
    });
    const newImage = new Image(image);
    const resultImage = await newImage.save();

    // 1.4. Return the product and image details to UI
    res.status(201).send({
      status: true,
      message: `Product: ${resultProduct.productName} added successfully`,
      proresultsduct: resultProduct,
      images: resultImage,
    });
  } catch (err) {
    console.log("Error at addProduct:", err.message);
    res.status(500).send({
      status: false,
      message: "Internal Server Error..!",
    });
  }
};

//-----------------------------------------
// 2. get all products
//-----------------------------------------

exports.getAllProducts = async (req, res) => {
  try {
    // 2.1. Get all products from the database
    const products = await Product.find({});

    // 2.2. Return the products to UI
    res.status(200).send({
      status: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (err) {
    console.log("Error at getAllProducts:", err.message);
    res.status(500).send({
      status: false,
      message: "Internal Server Error..!",
    });
  }
};
