// mongoDB TEST

const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number
  }
})


const product = mongoose.model('Product', productSchema);

module.exports = product