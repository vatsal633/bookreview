import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    review:{type:[String],default:[]}
})

const Login = mongoose.model("login",userSchema) 
export default Login