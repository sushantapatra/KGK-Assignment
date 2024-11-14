const express = require("express");
const {
	getAllPost,
	getRandomPost,
	getPostData,
	addNewPost,
	getUserPosts,
	getPost,
	UpdatePost,
	DeletePost,
} = require("../controllers/postCtrl");
const isAuthenticated = require("../middlewares/authMiddleware");
const upload = require("../middlewares/Multer");
//router object
const router = express.Router();

//routes
router.get("/all-posts", getAllPost);
router.get("/random-posts", getRandomPost);
router.get("/get-post-data/:id", getPostData);
router.get("/get-user-posts", isAuthenticated, getUserPosts);
router.post("/add-post", isAuthenticated, addNewPost);
// router.post("/add-post", isAuthenticated, upload.single("image"), addNewPost);
router.get("/get-post/:id", isAuthenticated, getPost);
router.post("/update-post/:id", isAuthenticated, UpdatePost);
router.delete("/delete-post/:id", isAuthenticated, DeletePost);

module.exports = router;
