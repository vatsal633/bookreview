import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import reviewRoute from "./routes/reviewRoute.js"
import adminRoute from "./routes/adminRoutes.js"
import connectDb from "./db.js"


dotenv.config()

const app = express()
connectDb()
const port = process.env.PORT || 3000

//middleware
app.use(express.json())
app.use(cors({
    origin: "https://bookreview-phi.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

//routes
app.use('/auth/api',authRoutes)
app.use('/book',bookRoutes)
app.use('/review',reviewRoute)
app.use('/api/admin',adminRoute)

app.get('/', (req, res) => {
    res.send("hellow world")
})

app.listen(port, () => {
    console.log(` Server running on port ${port}`);
});