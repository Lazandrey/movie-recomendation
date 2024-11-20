import jwt from "jsonwebtoken";

const authUsewr = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decoded.email);
    req.body.email = decoded.email;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authUsewr;
