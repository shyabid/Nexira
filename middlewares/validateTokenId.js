const jwt = require("jsonwebtoken");

const validateTokenId = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }

    // 🔐 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Frontend-safe fields (used everywhere)
    req.token_id = decoded?.uid || decoded?.id || null;
    req.token_email = decoded?.email || null;

    next();
  } catch (error) {
    console.error("Token validation error:", error);

    return res.status(401).send({
      message: "Unauthorized Access",
    });
  }
};

module.exports = validateTokenId;
