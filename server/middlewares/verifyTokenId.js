const admin = require("firebase-admin");

// ================= FIREBASE INIT (SERVERLESS SAFE) =================
if (!admin.apps.length) {
  if (!process.env.FIREBASE_SERVICE_KEY) {
    console.error("FIREBASE_SERVICE_KEY is missing");
  } else {
    try {
      const decoded = Buffer.from(
        process.env.FIREBASE_SERVICE_KEY,
        "base64",
      ).toString("utf8");

      const serviceAccount = JSON.parse(decoded);

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } catch (error) {
      console.error("Firebase admin init error:", error);
    }
  }
}

// ================= VERIFY TOKEN MIDDLEWARE =================
const verifyTokenId = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);

    // ✅ Frontend-safe fields
    req.token_email = decodedToken?.email || null;
    req.token_uid = decodedToken?.uid || null;

    next();
  } catch (error) {
    console.error("verifyTokenId error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = verifyTokenId;
