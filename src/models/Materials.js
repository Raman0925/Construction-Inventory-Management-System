const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },

  category: { type: String, required: true },

  unit: { type: String, required: true },

  base_price: { type: Number, required: true, min: 0 },

  stock: { type: Number, required: true, min: 0 },

  price_history:{
         
    
  }
},{timestamps:true});

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
