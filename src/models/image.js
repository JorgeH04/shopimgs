const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
    product: {type: String},
    price: {type: Number},
    filename: {type: String},
    path: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    size: { type: Number},
    created_at: {type: Date, default: Date.now()}
});

module.exports = model('Image', imageSchema);