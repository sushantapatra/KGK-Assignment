const {
	getAllPlugin,
	activePlugin,
	getAllActivePlugin,
	getAllActivePluginNAme,
} = require("../models/pluginModel");
const getPlugin = async (req, res) => {
	try {
		//populate method basically create a relation with to collection
		const plugins = await getAllPlugin();
		if (!plugins) {
			return res.status(200).json({
				success: false,
				message: "No result found",
			});
		}
		return res.status(200).json({
			success: true,
			plugins,
		});
	} catch (error) {
		console.log(`Get Plugin Error :${error}`);
	}
};

const saveActivePlugin = async (req, res) => {
	try {
		const userId = req.id;
		const { plugins } = req.body;
		//populate method basically create a relation with to collection
		const result = await activePlugin(userId, plugins);
		if (!result) {
			return res.status(200).json({
				success: false,
				message: "No result found",
			});
		}
		return res.status(200).json({
			success: true,
			message: "Plugin activated successfully",
		});
	} catch (error) {
		console.log(`Get Plugin Error :${error}`);
	}
};
const getActivePlugin = async (req, res) => {
	try {
		//populate method basically create a relation with to collection
		const userId = req.id;
		const plugins = await getAllActivePlugin(userId);
		if (!plugins) {
			return res.status(404).json({
				success: false,
				message: "No result found",
			});
		}
		return res.status(200).json({
			success: true,
			plugins,
		});
	} catch (error) {
		console.log(`Get Plugin Error :${error}`);
	}
};
const getActivePluginName = async (req, res) => {
	try {
		//populate method basically create a relation with to collection
		const userId = req.id;
		const plugins = await getAllActivePluginNAme(userId);
		if (!plugins) {
			return res.status(200).json({
				success: false,
				message: "No result found",
			});
		}
		return res.status(200).json({
			success: true,
			plugins,
		});
	} catch (error) {
		console.log(`Get Plugin Error :${error}`);
	}
};
module.exports = {
	getPlugin,
	saveActivePlugin,
	getActivePlugin,
	getActivePluginName,
};
