const Product = require("../models/products.model");
const Image = require("../models/img.model");
const util = require("../util/utility");

//-----------------------------------------
// 1. Add new product
//----------------------------------------

exports.addProduct = async (req, res) => {

  try {
    let lastIdProduct = await Product.findOne({}).sort({productId:"desc"}).exec();
    if (!lastIdProduct) lastIdProduct = 1;
    else lastIdProduct = lastIdProduct.productId + 1;
    req.body.productId = lastIdProduct;
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
      imgId: util.generateImgeCode(),
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
    const products = await Product.find({},
        {
            productId: 1,
            productName: 1,
            description: 1,
            price: 1,
            stock: 1,
            categoryId: 1,
            createdBy: 1,
            totalRate: 1,
            tags: 1,
            discountId: 1,
            images: {
                $push: {
                    imgId: 1,
                    url: 1,
                    createdOn: 1,
                }
            },
            createdOn: 1,
            _id: 0,
        }
    ).sort(
        { productId: "asc" }
    ).exec();

    // 2.2. Return the products to UI
    res.status(200).send({
      status: true,
      message: "Products fetched successfully",
      results: products,
    });
  } catch (err) {
    console.log("Error at getAllProducts:", err.message);
    res.status(500).send({
      status: false,
      message: "Internal Server Error..!",
    });
  }
};

//-----------------------------------------
// 3. get by productId 
//-----------------------------------------

exports.getProductById = async (req, res) => {
    try {
        productId = req.params.productId;
    // 3.1. Get the product from the database by productId
    const product = await Product.findOne({ productId: productId },
        {
            productId: 1,
            productName: 1,
            description: 1,
            price: 1,
            stock: 1,
            categoryId: 1,
            createdBy: 1,
            totalRate: 1,
            tags: 1,
            discountId: 1,
            images: 1,
            createdOn: 1,
            _id: 0,
        }
    ).exec();
    if (!product) {
        return res.status(404).send({
            status: false,
            message: "Product not found..!",
        });
    }
    // 3.2. Return the product to UI
    res.status(200).send({
        status: true,
        message: "Product fetched successfully",
        results: product,
    });
    } catch (err) {
        console.log("Error at getProductById:", err.message);
        res.status(500).send({
            status: false,
            message: "Internal Server Error..!",
        });
    }
};
