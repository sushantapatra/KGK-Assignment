const cloudinary = require("../config/Cloudnary.js");
const sharp = require("sharp");

const {
	getAllPosts,
	getRandomPosts,
	getPostsByUserId,
	getPostsById,
	deletePost,
	insertPost,
	updatePost,
} = require("../models/postModel");
const getAllPost = async (req, res) => {
	try {
		//populate method basically create a relation with to collection
		const posts = await getAllPosts();
		if (!posts) {
			return res.status(200).json({
				success: false,
				message: "No result found",
			});
		}
		return res.status(200).json({
			success: true,
			posts,
		});
	} catch (error) {
		console.log(`Get All Post Error :${error}`);
	}
};
const getRandomPost = async (req, res) => {
	try {
		//populate method basically create a relation with to collection
		const posts = await getRandomPosts();
		if (!posts) {
			return res.status(200).json({
				success: false,
				message: "No result found",
			});
		}
		return res.status(200).json({
			success: true,
			posts,
		});
	} catch (error) {
		console.log(`Get All Post Error :${error}`);
	}
};
const getPostData = async (req, res) => {
	try {
		const postId = req.params.id;
		//populate method basically create a relation with to collection
		const posts = await getPostsById({ id: postId });
		if (!posts) {
			return res.status(200).json({
				success: false,
				message: "No result found",
			});
		}
		return res.status(200).json({
			success: true,
			posts,
		});
	} catch (error) {
		console.log(`Get All Post Error :${error}`);
	}
};
const getUserPosts = async (req, res) => {
	try {
		const userId = req.id;
		const posts = await getPostsByUserId({ user_id: userId });
		if (!posts) {
			return res.status(200).json({
				success: false,
				message: "No result found",
			});
		}
		return res.status(200).json({
			success: true,
			posts,
		});
	} catch (error) {
		console.log(`Get User Post Error :${error}`);
	}
};
const addNewPost = async (req, res) => {
	try {
		//const { title, slug, content } = req.body;
		//const image = req.file;
		const userId = req.id;

		/*
		if (!image) {
			return res
				.status(400)
				.json({ success: false, message: "Image required." });
		}
		//image upload with image quality reduce using "sharp" package
		const optimizedImageBuffer = await sharp(image.buffer)
			.resize({ width: 800, height: 400, fit: "inside" })
			.tohtmlFormat("jpeg", { quality: 80 })
			.toBuffer();
		
		// console.log(optimizedImageBuffer, "optimize Image buffer");

		//buffer to data uri
		const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
			"base64"
		)}`;
		// console.log(fileUri, "File URI");
		const cloudinaryResponse = await cloudinary.uploader.upload(fileUri);
		req.body.image = cloudinaryResponse.secure_url;
		*/
		req.body.user_id = userId;
		const post = await insertPost(req.body);

		return res.status(201).json({
			success: true,
			message: "Post created successfully",
			post,
		});
	} catch (error) {
		console.log(`Add New Post Error :${error}`);
	}
};
const getPost = async (req, res) => {
	try {
		const userId = req.id;
		const postId = req.params.id;
		const posts = await getPostsById({ id: postId });
		if (!posts) {
			return res.status(200).json({
				success: false,
				message: "No result found",
			});
		}
		return res.status(200).json({
			success: true,
			posts,
		});
	} catch (error) {
		console.log(`Get Post Error :${error}`);
	}
};
const UpdatePost = async (req, res) => {
	try {
		const userId = req.id;
		const postId = req.params.id;
		/*
		const image = req.file;
		if (image) {
			//image upload with image quality reduce using "sharp" package
			const optimizedImageBuffer = await sharp(image.buffer)
				.resize({ width: 800, height: 400, fit: "inside" })
				.tohtmlFormat("jpeg", { quality: 80 })
				.toBuffer();

			// console.log(optimizedImageBuffer, "optimize Image buffer");

			//buffer to data uri
			const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
				"base64"
			)}`;
			// console.log(fileUri, "File URI");
			const cloudinaryResponse = await cloudinary.uploader.upload(
				fileUri
			);
			req.body.image = cloudinaryResponse.secure_url;
		} else {
			req.body.image = req.body.image_url;
		}
		*/
		req.body.user_id = userId;
		const posts = await updatePost(postId, req.body);
		if (!posts) {
			return res.status(200).json({
				success: false,
				message: "No result found",
			});
		}
		return res.status(200).json({
			success: true,
			message: "Post updated successfully",
			posts,
		});
	} catch (error) {
		console.log(`Get User Post Error :${error}`);
	}
};
const DeletePost = async (req, res) => {
	try {
		const userId = req.id;
		const postId = req.params.id;
		const post = await deletePost(userId, postId);
		if (!post) {
			return res.status(200).json({
				success: false,
				message: "Post not found",
			});
		}
		return res.status(200).json({
			success: true,
			message: "Post deleted successfully.",
		});
	} catch (error) {
		console.log(`Post deleted Error :${error}`);
	}
};
module.exports = {
	getAllPost,
	getRandomPost,
	getPostData,
	addNewPost,
	getUserPosts,
	getPost,
	UpdatePost,
	DeletePost,
};
