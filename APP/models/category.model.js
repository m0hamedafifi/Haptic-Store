const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryId: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String },
    parentId: { type: Number },
    createdOn: { type: String },
    updatedOn: { type: Date, default: Date.now },
});

const category = mongoose.model('Category',categorySchema)

module.exports = category;