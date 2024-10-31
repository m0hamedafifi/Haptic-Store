const express = require("express");
const router = express.Router();
const categoryController = require('../Admin/category.controller');

// ----------------------------------------------------------------
// GET
router.get('/category', categoryController.getAllCategories);

// ----------------------------------------------------------------
// POST

router.post('/category/create', categoryController.createCategory);


//-----------------------------------------------------------------
//delete

router.delete('/category/delete', categoryController.deleteCategoryById);

//-----------------------------------------------------------------
//Update

router.put('/category/update', categoryController.updateCategoryById);

module.exports = router;