import adminModel from "../model/admin.js"
import jwt from "jsonwebtoken"

export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.send({ message: "all feild are required" })
        }
    
        const admin = await adminModel.findOne({username})
    
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" })
        }

        if (password !== admin.password) {
            return res.status(401).json({ message: "invalid password" });
        }

        const token = jwt.sign({ username: admin.username, role:"admin"}, process.env.JWT_SECRET,)

        res.status(200).json({
            message: "login successfully",
            token:{username:"admin",token}
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "server error while admin login" })
    }
}