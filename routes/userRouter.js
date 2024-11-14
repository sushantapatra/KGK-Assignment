const express = require("express");
const {
	loginController,
	registerController,
	getProfile,
	editProfile,
	logout,
} = require("../controllers/userCtrl");
const isAuthenticated = require("../middlewares/authMiddleware");
const upload = require("../middlewares/Multer");
//router object
const router = express.Router();

//routes
router.post("/login", loginController);
router.post("/register", registerController);
router.get("/logout", logout);
router.get("/:id/profile/", isAuthenticated, getProfile);
//router.route("/:id/profile/").get(isAuthenticated, getProfile);
router.post(
	"/profile/edit",
	isAuthenticated,
	upload.single("image"),
	editProfile
);

module.exports = router;
