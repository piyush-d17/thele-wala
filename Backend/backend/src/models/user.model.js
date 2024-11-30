const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    location: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'Location',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['seller', 'buyer'],
    },
    phone: {
      type: String,
    },
    category: {
      type: String,
      enum: ['Beverages', 'Healthy', 'Desserts', 'Miscellaneous', 'Snacks'],
    },
    subcategories: [
      {
        category: {
          type: String,
          required: true,
        },
        subcategory: {
          type: [String], // Array of subcategories for the given category
        },
      },
    ],
    latitude:{
      type:String,
    },
    longitude:{
      type:String,
    },
    ip:{
      type:String,
    }
  },
  
  { timestamps: true }
);

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candPassword) {
  return await bcrypt.compare(candPassword, this.password);
};

userSchema.methods.createToken = async function () {
  const token = jwt.sign(
    { userId: this._id, name: this.name, email: this.email, role: this.role, phone: this.phone },
    process.env.SECRET,
    { expiresIn: process.env.EXPIRY }
  );
  return token;
};

module.exports = mongoose.model('User', userSchema);
