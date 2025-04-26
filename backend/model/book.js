import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    coverImage:{type:String,default:""}
});

const book = mongoose.model("books",bookSchema)
export default book