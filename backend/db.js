import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("Database connected")
    }
    catch (err) {
        console.err("mongodb connection error",err)
        process.exit(1);
    }
}

export default connectDb