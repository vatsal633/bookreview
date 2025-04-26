import express from "express"
import Login from "../model/Login.js"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post('/:username/signin', async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            res.send({ message: "all feild are required" })
        }

        let existingUser = await Login.findOne({ username })

        if (existingUser) {
            return res.status(400).json({ message: "user is already exist" })
        }

        const newUser = new Login({ username, email, password })
        await newUser.save();
        res.status(200).json({ message: "registration sucess" })
    } catch (err) {

    }
    res.send({ message: `signing sucess with ${username} ${email} ${password}` })
})

router.post('/:username/login', async(req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await Login.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: 123 }, "your_secret_key", { expiresIn: "1h" });

        return res.status(200).json({ message: "Login successful", user,token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error during login" });
    }
})


router.post('/:username/getdata',(req,res)=>{
    
})


export default router