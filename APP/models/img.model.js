const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
    imgId: { type: Number, unique: true, required: true },
    productId: { type: Number, required: true },
    url: { type: String, required: true },
    createdOn: { type: Date },
    updatedOn: { type: Date, default: Date.now },
});