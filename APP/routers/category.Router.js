const express = require("express");
const router = express.Router();
const categoryController = require('../Admin/category.controller');

// ----------------------------------------------------------------
// GET
router.get('/admin/category', categoryController.getAllCategories);

// ----------------------------------------------------------------
// POST
router.post('/admin/category/create', categoryController.createCategory);

//-----------------------------------------------------------------
//delete

router.delete('/admin/category/delete', categoryController.deleteCategoryById);

//-----------------------------------------------------------------
//Update
router.put('/admin/category/update', categoryController.updateCategoryById);

module.exports = router;