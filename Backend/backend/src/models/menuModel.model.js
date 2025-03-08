const mongoose =require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  subcategories: [
    {
      type: String,
    },
  ],
  author:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const menu = mongoose.model('menu', menuSchema);

module.exports = menu;
