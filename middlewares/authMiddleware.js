const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
	try {
		const token = req.cookies?.token;
		//const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({
				success: false,
				message: "User not authenticated",
			});
		}
		//verify token
		const decode = await jwt.verify(token, process.env.SECRET_KEY);
		if (!decode) {
			return res.status(401).json({
				success: false,
				message: "Invalid Token",
			});
		}
		req.id = decode.userId;
		next();
	} catch (error) {
		console.log(`Authenication Error : ${error}`);
	}
};

module.exports = isAuthenticated;
