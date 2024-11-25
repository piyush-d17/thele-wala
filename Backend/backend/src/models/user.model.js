const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
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
    aadhar: {
        type: String,
    },
    role: {
        type: String,
        enum: ['seller', 'buyer'],
        default: 'buyer',
    },
    photo: {
        type: String,
    },
    phone: {
        type: String,
    },
    reviews: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        enum: ['water', 'vegetables', 'fruit', 'iceCream', 'ragPicker', 'juice', 'potter','snacks','plant','bedsheets','others'],
    },
    location:{
        type:mongoose.Types.ObjectId,
        ref:'Location',
    },
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: 'Order', 
    }]
}, { timestamps: true });

userSchema.pre('save',async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

userSchema.methods.comparePassword = async function(candPassword){
    const mat = await bcrypt.compare(candPassword,this.password);
    return mat;
}

userSchema.methods.createToken = async function(){
    const token = jwt.sign({userId:this._id,email:this.email,role:this.role,phone:this.phone},process.env.SECRET,{expiresIn:process.env.EXPIRY})
    return token;
}

module.exports = mongoose.model('User', userSchema);
