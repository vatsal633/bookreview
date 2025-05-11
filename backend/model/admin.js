import mongoose from "mongoose"


const adminSchema = mongoose.Schema({
    username:String,
    password:String,
})


const admin = mongoose.model('admin',adminSchema)
export default admin