import jwt from "jsonwebtoken";

const auth = async (req) => {
  if (req.headers && req.headers.authorization) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (token) {
        const decodedData = jwt.verify(token, process.env.JWT_KEY);

        return { user: decodedData };
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export default auth;
