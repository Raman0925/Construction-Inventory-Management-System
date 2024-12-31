const mongoose = require('mongoose');
const Material = require('./Materials');

// Order Item Schema
const OrderItemSchema = new mongoose.Schema(
  {
    MaterialItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material',
      required: true
    },
    quantity: { type: Number, required: true, min: 1 },
    price_per_unit: { type: Number, required: true },
    total_price: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

// Purchase Order Schema
const purchaseOrderSchema = new mongoose.Schema(
  {
    purchasedFrom:{
      type:String,
      required:true
    },
  
    purchasedBy: {
      type: String,
      required: true
    },
    orderDate: {
      type: Date,
      default: Date.now
    },
    lineItems: [OrderItemSchema], // Multiple line items
    status: {
      type: String,
      enum: ['Pending', 'Shipped', 'Completed'],
      default: 'Pending'
    }

  },
  {
    timestamps: true
  }
);

purchaseOrderSchema.pre('save',function(next){
        this.lineItems.forEach(
          item =>{
            OrderItemSchema.total_price = item.quantity * item.price_per_unit;
            if(item.quantity>50){
              item.total_price *= 0.9;
            }else if(item.quantity>10){
              item.total_price *= 0.95
            }
          }
        )
        next();
})
purchaseOrderSchema.pre('save',async function(next){
  for(let item of this.lineItems){
    const material = await Material.findById(item.MaterialItem);
    if(material&& material.stock<item.quantity){
      const error = new Error('not enough stock for ${material.name}');
      return next(error)
    }
  }
  next();
})

purchaseOrderSchema.post('save', async function(doc) {
  try {
    for (let item of doc.lineItems) {
      const material = await Material.findById(item.MaterialItem);
      if (material) {
        material.stock -= item.quantity;
        await material.save();  
      }
    }
  } catch (error) {
    console.error('Error updating inventory:', error);
  }
});
const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);

module.exports = PurchaseOrder;