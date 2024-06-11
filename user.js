const mongoose= require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name:String,
    email:String,
    is_verified:Boolean
})

module.exports = mongoose.model('users',userSchema)
