const express = require("express");
const isAuthenticated = require("../middlewares/authMiddleware");
const {
	getPlugin,
	saveActivePlugin,
	getActivePlugin,
	getActivePluginName,
} = require("../controllers/pluginCtrl");
//router object
const router = express.Router();

router.get("/get-plugin", getPlugin);
router.post("/active-plugin", isAuthenticated, saveActivePlugin);
router.get("/get-active-plugin", isAuthenticated, getActivePlugin);
router.get("/get-active-plugin-name", isAuthenticated, getActivePluginName);

module.exports = router;
