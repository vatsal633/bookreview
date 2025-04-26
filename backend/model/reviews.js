import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    book:String,
    user:String,
    rating:Number,
    comment:String
})

const review = mongoose.model('reviews',reviewSchema)
export default review