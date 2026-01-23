const admin = require("firebase-admin");

if (!admin.apps.length) {
  if (!process.env.FIREBASE_SERVICE_KEY) {
    throw new Error("FIREBASE_SERVICE_KEY is missing");
  }

  const decoded = Buffer.from(
    process.env.FIREBASE_SERVICE_KEY,
    "base64",
  ).toString("utf8");

  const serviceAccount = JSON.parse(decoded);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const verifyTokenId = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.token_email = decodedToken.email;
    next();
  } catch (error) {
    console.error("verifyTokenId error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyTokenId;
