const mysql = require("mysql");
const con = require("../config/dbConnection");
const connection = con.getConnection();
//connection.connect();
const getImageSlider = () => {
	return new Promise((resolve, reject) => {
		try {
			connection.query(
				"SELECT * FROM imageslider WHERE status=1",
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
				message: `Get Image Slider Error: ${error.message}`,
			});
		}
	});
};

const insertImageSlider = (imageUrl) => {
	return new Promise((resolve, reject) => {
		try {
			const sql = "INSERT INTO imageslider (image) VALUES (?)";
			const values = [imageUrl];
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
const deleteImage = (imgId) => {
	return new Promise((resolve, reject) => {
		try {
			connection.query(
				"UPDATE imageslider SET status=0 WHERE img_id = ?",
				[imgId],
				(error, results) => {
					if (error) {
						return reject({
							success: false,
							message: "Database query failed",
							error,
						});
					}
					// If results array is empty, no user found
					if (results.affectedRows > 0) {
						resolve(results); // User found, return the first result
					} else {
						resolve(null); // No user found
					}
				}
			);
		} catch (error) {
			reject({
				success: false,
				message: `Delete Post Eror: ${error.message}`,
			});
		}
	});
};

module.exports = {
	getImageSlider,
	insertImageSlider,
	deleteImage,
};
