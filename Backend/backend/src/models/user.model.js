const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Define the schema
const userSchema = new mongoose.Schema(
  {
    location: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'Location',
    },
    subscription:{
      type:Boolean,
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
    latitude:{
      type:String,
    },
    longitude:{
      type:String,
    },
    ip:{
      type:String,
    },
  },
  { timestamps: true }
);

// Hash password before saving to the database
userSchema.pre('save', async function (next) {
  // Check if the password field is modified
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candPassword) {
  try {
    return await bcrypt.compare(candPassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Method to create a JWT token
userSchema.methods.createToken = function () {
  try {
    const token = jwt.sign(
      {
        userId: this._id,
        email: this.email,
        role: this.role,
        phone: this.phone,
      },
      process.env.SECRET,
      { expiresIn: process.env.EXPIRY }
    );
    return token;
  } catch (error) {
    throw new Error('Token creation failed');
  }
};

// Export the User model
module.exports = mongoose.model('User', userSchema);
