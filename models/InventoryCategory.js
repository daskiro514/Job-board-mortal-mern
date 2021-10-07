/**
 * Inventory category mongodb schema
 * Created at 2021/09/15
 * Created by Ilia L
 */
const mongoose = require('mongoose')

const InventoryCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
      required: true,
      unique: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'inventory_categories',
    },
    ancestors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'inventory_categories',
      },
    ],
  },
  { timestamps: true },
)

module.exports = mongoose.model('inventory_categories', InventoryCategorySchema)
