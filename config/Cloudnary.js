const { v2: cloudinary } = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config({});

cloudinary.config({
	cloud_name: process.env.CLOUDNARY_NAME,
	api_key: process.env.CLOUDNARY_API_KEY,
	api_secret: process.env.CLOUDNARY_SECRET_KEY,
});

module.exports = cloudinary;
