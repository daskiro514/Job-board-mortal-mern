const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      default: '',
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: '',
    },
    purchasePrice: {
      type: Number,
      default: 0,
    },
    salePrice: {
      type: Number,
      default: 0,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product_categories',
    },
    ancestors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product_categories',
      },
    ],
  },
  { timestamps: true },
)

module.exports = mongoose.model('products', ProductSchema)
