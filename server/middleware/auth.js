const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
    if(!token) {
        return res.status(401).json({msg : "Authentication error, Please login first."});
    }

    const decodedPayload = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedPayload;

    next();
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error.message});
    }
}

module.exports = isAuthenticated;