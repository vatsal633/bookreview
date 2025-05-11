import jwt from "jsonwebtoken";

export const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Admin token missing. Please login." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: 'Invalid token format. Expected "Bearer <token>"' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please login again." });
    }

    return res.status(403).json({ message: "Invalid token." });
  }
};
