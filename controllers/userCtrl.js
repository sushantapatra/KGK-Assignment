const {
	checkUserById,
	checkUserByEmail,
	insertUser,
	updateUser,
} = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDataUri = require("../config/Datauri");
const cloudinary = require("../config/Cloudnary");

const loginController = async (req, res) => {
	try {
		let user = await checkUserByEmail({ email: req.body.email });
		if (!user) {
			return res.status(200).send({
				success: false,
				message: "User not found",
			});
		}
		const isMatch = await bcrypt.compare(req.body.password, user.password);
		if (!isMatch) {
			return res.status(200).send({
				success: false,
				message: "Invalid Email or Password",
			});
		}
		//Generate JWT Token
		const token = await jwt.sign(
			{ userId: user.id },
			process.env.SECRET_KEY,
			{ expiresIn: "1d" }
		);
		user = {
			id: user.id,
			name: user.name,
			email: user.email,
			phone: user.phone,
		};
		return res
			.cookie("token", token, {
				httpOnly: true,
				maxAge: 1 * 24 * 60 * 60 * 1000,
				secure: process.env.NODE_MODE === "production",
				sameSite:
					process.env.NODE_MODE === "production" ? "strict" : "lax",
			})
			.json({
				success: true,
				message: `Welcome Back ${user.name}`,
				user,
				token,
			});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: `Login Controller Error : ${error.message}`,
		});
	}
};

const registerController = async (req, res) => {
	try {
		const existingUser = await checkUserByEmail({ email: req.body.email });

		if (existingUser) {
			return res.status(200).send({
				success: false,
				message: "User Already Exist.",
			});
		}
		//pasword hasing using bcrypt
		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		req.body.password = hashedPassword;

		const newUser = await insertUser(req.body);

		if (newUser) {
			return res.status(201).send({
				success: true,
				message: `Registeration Successfully.`,
			});
		} else {
			res.status(500).send({
				success: false,
				message: `Register Controller Error : ${newUser}`,
			});
		}
	} catch (error) {
		res.status(500).send({
			success: false,
			message: `Register Controller Error : ${error.message}`,
		});
	}
};
const getProfile = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await checkUserById({ id: userId });
		if (!user) {
			return res.status(200).json({
				success: false,
				message: "User not found.",
			});
		}
		return res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		console.log(`GetProfile Error : ${error}`);
	}
};
const editProfile = async (req, res) => {
	try {
		const userId = req.id; //Getting this by userAuthenication middleware
		const user = await checkUserById({ id: userId });
		if (!user) {
			return res.status(200).json({
				success: false,
				message: "User not found.",
			});
		}
		const profilePicture = req.file;
		let cloudResponse;
		if (profilePicture) {
			const fileUri = getDataUri(profilePicture);
			cloudResponse = await cloudinary.uploader.upload(fileUri);
		}
		req.body.image = cloudResponse.secure_url;
		const updatedUser = await updateUser(userId, req.body);
		if (!updatedUser) {
			return res.status(500).send({
				success: false,
				message: `Profile updated Error : ${updatedUser}`,
			});
		}
		return res.status(200).json({
			success: true,
			message: "Profile updated.",
			user: updatedUser,
		});
	} catch (error) {
		console.log(`Edit Profile Error : ${error}`);
	}
};
const logout = async (_, res) => {
	try {
		return res.cookie("token", "", { maxAge: 0 }).json({
			success: true,
			message: `Logout successfully`,
		});
	} catch (error) {
		console.log(`Logout Error : ${error}`);
	}
};
module.exports = {
	loginController,
	registerController,
	getProfile,
	editProfile,
	logout,
};
