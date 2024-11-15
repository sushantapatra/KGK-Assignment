const express = require("express");
const isAuthenticated = require("../middlewares/authMiddleware");
const upload = require("../middlewares/Multer");
const {
	getAllImageSliders,
	saveImageSlider,
	DeleteImageSlide,
} = require("../controllers/imagesliderCtrl");
//router object
const router = express.Router();

router.get("/get-image-slider", getAllImageSliders);
router.post("/add-image-slider", upload.single("image"), saveImageSlider);
router.delete("/delete-image-slider/:id", DeleteImageSlide);

module.exports = router;
