import jwt from "jsonwebtoken";

const tokenpayload = async (req, res, next) => {
  try {
    // Check if the Authorization header is present
    const authHeader = req.header("Authorization");
    console.log("Auth header:", authHeader);
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided" });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided" });
    }

    // Verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the token payload to the request object for use in subsequent middleware/routes
    req.user = payload;

    console.log("Token verified successfully:", payload);

    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Access token expired" });
    }

    res.status(403).json({ message: "Invalid token" });
  }
};

export { tokenpayload };
