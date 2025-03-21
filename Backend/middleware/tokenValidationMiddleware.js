import jwt from "jsonwebtoken";


const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // This should include the `id` field
    // console.log("Decoded token payload:", req.user); // Debug the payload
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Access token expired." });
    }
    res.status(403).json({ message: "Invalid token." });
  }
};

export { authenticateToken };

