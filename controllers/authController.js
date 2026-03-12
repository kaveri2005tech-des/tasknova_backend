import jwt from "jsonwebtoken";

const authenticateUser = async (req, res, next) => {
  try {
    jwt.verify(
      req.headers.authorization.split(" ").at(-1),
      process.env.JWT_SECRET,
    );
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export default authenticateUser;
