import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import reviewRoute from "./routes/reviewRoute.js"
import connectDb from "./db.js"


dotenv.config()

const app = express()
connectDb()
const port = process.env.PORT || 3000

//middleware
app.use(express.json())
app.use(cors())

//routes
app.use('/auth/api',authRoutes)
app.use('/book',bookRoutes)
app.use('/review',reviewRoute)

app.get('/', (req, res) => {
    res.send("hellow world")
})

app.listen(port, () => {
    console.log(` Server running on port ${port}`);
});