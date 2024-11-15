const cloudinary = require("../config/Cloudnary.js");
const sharp = require("sharp");
const {
	getImageSlider,
	insertImageSlider,
	deleteImage,
} = require("../models/imagesliderModel");

const getAllImageSliders = async (req, res) => {
	try {
		//populate method basically create a relation with to collection
		const imagesliders = await getImageSlider();
		if (!imagesliders) {
			return res.status(404).json({
				success: false,
				message: "No result found",
			});
		}
		return res.status(200).json({
			success: true,
			imagesliders,
		});
	} catch (error) {
		console.log(`Get Plugin Error :${error}`);
	}
};

const saveImageSlider = async (req, res) => {
	try {
		const image = req.file;
		//const userId = req.id;
		if (!image) {
			return res
				.status(400)
				.json({ success: false, message: "Image required." });
		}
		//image upload with image quality reduce using "sharp" package
		const optimizedImageBuffer = await sharp(image.buffer)
			.resize({ width: 800, height: 400, fit: "inside" })
			.toFormat("jpeg", { quality: 80 })
			.toBuffer();

		// console.log(optimizedImageBuffer, "optimize Image buffer");

		//buffer to data uri
		const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
			"base64"
		)}`;
		// console.log(fileUri, "File URI");
		const cloudinaryResponse = await cloudinary.uploader.upload(fileUri);
		let imageUrl = cloudinaryResponse.secure_url;

		//populate method basically create a relation with to collection
		const result = await insertImageSlider(imageUrl);
		if (!result) {
			return res.status(404).json({
				success: false,
				message: "No result found",
			});
		}
		return res.status(200).json({
			success: true,
			message: "Image uploaded successfully",
		});
	} catch (error) {
		console.log(`Get Plugin Error :${error}`);
	}
};
const DeleteImageSlide = async (req, res) => {
	try {
		//const userId = req.id;
		const imgId = req.params.id;
		const post = await deleteImage(imgId);
		if (!post) {
			return res.status(404).json({
				success: false,
				message: "Image not found",
			});
		}
		return res.status(200).json({
			success: true,
			message: "Image deleted successfully.",
		});
	} catch (error) {
		console.log(`Post deleted Error :${error}`);
	}
};

module.exports = {
	getAllImageSliders,
	saveImageSlider,
	DeleteImageSlide,
};
