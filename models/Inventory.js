/**
 * Inventory mogodb schema
 * Created at 2021/09/15
 * Created by Ilia L
 */

const mongoose = require('mongoose')

const InventorySchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      default: '',
      unique: true,
      required: true,
    },
    productName: {
      type: String,
      default: '',
    },
    stockOnHand: {
      type: Number,
      default: 1,
    },
    minimumStockLevel: {
      type: Number,
      default: 1,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
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
      ref: 'material_categories',
    },
    ancestors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'material_categories',
      },
    ],
  },
  { timestamps: true },
)

module.exports = mongoose.model('inventory', InventorySchema)
