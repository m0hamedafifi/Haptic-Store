const Category = require("../models/category.model");
const util = require("../util/utility");

exports.createCategory = async (req, res) => {
  try {
    // get the latest id of the category from the categories collection and increment it by one to create a unique id for the new category
    let lastIdCategory = await Category.findOne()
      .sort({ categoryId: "desc" })
      .exec();
    if (!lastIdCategory) lastIdCategory = 1;
    else lastIdCategory = lastIdCategory.categoryId + 1;
    req.body.categoryId = lastIdCategory;

    let data = {
      categoryId: req.body.categoryId,
      name: req.body.name,
      description: req.body.description,
      parentId: req.body.parentId,
      createdOn: util.dateFormat(),
    };
    console.log(data);
    
    // check category name is already exist or not already
    const categoryExistOrNot = await Category.findOne({ name: data.name });
    if (categoryExistOrNot) {
      return res.status(409).send({
        status: false,
        message: "Category name already exist..!",
      });
    }

    // create new category
    const newCategory = new Category(data);
    const result = await newCategory.save();

    res.status(201).send({
      status: true,
      message: `Category ${result.name} has been created successfully..!`,
      results: result,
    });
  } catch (err) {
    console.log("Error at createCategory", err.message);
    res.status(500).send({
      status: false,
      message: "Internal server error...!",
    });
  }
};


//=======================================
//get all categories
//=======================================

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({},{categoryId:1,
        name:1,
        description:1,
        parentId:1,
        createdOn:1,
        _id:0
    }).sort({categoryId: "asc"}).exec();
    res.status(200).send({
      status: true,
      message: "All categories fetched successfully..!",
      results: categories,
    });
  } catch (err) {
    console.log("Error at getAllCategories:", err.message);
    res.status(500).send({
      status: false,
      message: "Internal server error...!",
    });
  }
};


//=====================================================
// delete  category by id
//=====================================================

exports.deleteCategoryById = async (req, res) => {
  try {
    const categoryId = req.query.categoryId;

    const category = await Category.findOneAndDelete({categoryId: categoryId});
    if (!category) {
      return res.status(404).send({
        status: false,
        message: "Category not found..!",
      });
    }
    res.status(200).send({
      status: true,
      message: `Category with id: ${req.body.categoryId} has been deleted successfully..!`,
      results: category,
    });
  } catch (err) {
    console.log("Error at deleteCategoryById:", err.message);
    res.status(500).send({
      status: false,
      message: "Internal server error...!",
    });
  }
};

//=====================================================
// update Category
//======================================================
exports.updateCategoryById = async (req, res) => {
  try {
    const categoryId = req.query.categoryId;
    
    const category = await Category.findOneAndUpdate({categoryId: categoryId}, req.body, { new: true });
    if (!category) {
      return res.status(404).send({
        status: false,
        message: "Category not found..!",
      });
    }
    res.status(200).send({
      status: true,
      message: `Category with id: ${categoryId} has been updated successfully..!`,
      results: category,
    });
  } catch (err) {
    console.log("Error at updateCategoryById:", err.message);
    res.status(500).send({
      status: false,
      message: "Internal server error...!",
    });
  }
};