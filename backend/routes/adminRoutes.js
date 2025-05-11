import express from "express"
import { authenticateAdmin } from "../middleware/adminAuth.js"
import { adminLogin } from "../controller/adminController.js"


const router = express.Router()


router.post('/login',adminLogin)

router.post('/verify', authenticateAdmin, (req, res) => {
  res.status(200).json({ message: "Admin verified", admin: req.admin });
});

export default router