const mysql = require("mysql");
const con = require("../config/dbConnection");
const connection = con.getConnection();
//connection.connect();
const getAllPlugin = () => {
	return new Promise((resolve, reject) => {
		try {
			connection.query(
				"SELECT * FROM plugins WHERE status=1",
				(error, results) => {
					if (error) {
						connection.end();
						return reject({
							success: false,
							message: "Database query failed",
							error,
						});
					}
					// If results array is empty, no user found
					if (results.length === 0) {
						resolve(null); // No user found
					} else {
						resolve(results); // User found, return the first result
					}
				}
			);
		} catch (error) {
			reject({
				success: false,
				message: `Get Plugin Error: ${error.message}`,
			});
		}
	});
};

const activePlugin = (user_id, plugins) => {
	return new Promise((resolve, reject) => {
		try {
			const pluginsArray = plugins.map(Number);
			const sql = "UPDATE users SET plugins=?  WHERE id = ?";
			const values = [JSON.stringify(pluginsArray), user_id];
			connection.query(sql, values, (error, results) => {
				if (error) {
					return reject({
						success: false,
						message: "Database query failed",
						error,
					});
				}
				if (results.affectedRows > 0) {
					resolve(results.affectedRows);
				} else {
					connection.end();
					resolve(null);
				}
			});
		} catch (error) {
			reject({
				success: false,
				message: `Update Plugin Error: ${error.message}`,
			});
		}
	});
};
const getAllActivePlugin = (userId) => {
	return new Promise((resolve, reject) => {
		try {
			connection.query(
				"SELECT plugins FROM users WHERE id=" + userId,
				(error, results) => {
					if (error) {
						connection.end();
						return reject({
							success: false,
							message: "Database query failed",
							error,
						});
					}
					// If results array is empty, no user found
					if (results.length === 0) {
						resolve(null); // No user found
					} else {
						resolve(results); // User found, return the first result
					}
				}
			);
		} catch (error) {
			reject({
				success: false,
				message: `Get Plugin Error: ${error.message}`,
			});
		}
	});
};
const getAllActivePluginNAme = (userId) => {
	return new Promise((resolve, reject) => {
		try {
			connection.query(
				"SELECT * FROM plugins WHERE JSON_CONTAINS((SELECT plugins FROM users WHERE id =" +
					userId +
					"), CAST(plugin_id AS JSON))",
				(error, results) => {
					if (error) {
						connection.end();
						return reject({
							success: false,
							message: "Database query failed",
							error,
						});
					}
					// If results array is empty, no user found
					if (results.length === 0) {
						resolve(null); // No user found
					} else {
						resolve(results); // User found, return the first result
					}
				}
			);
		} catch (error) {
			reject({
				success: false,
				message: `Get Plugin Name Error: ${error.message}`,
			});
		}
	});
};

module.exports = {
	getAllPlugin,
	activePlugin,
	getAllActivePlugin,
	getAllActivePluginNAme,
};
