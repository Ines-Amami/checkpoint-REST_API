const mongoose = require('mongoose')
const userSchema= new mongoose.Schema({
name:  { type: String, uppercase: true, trim: true, required: true },
age: Number,
email:String
})
module.exports = User = mongoose.model('user', userSchema)