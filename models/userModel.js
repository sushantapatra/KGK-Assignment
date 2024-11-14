const mysql = require("mysql");
const con = require("../config/dbConnection");
const connection = con.getConnection();
//connection.connect();
const checkUserById = ({ id }) => {
	return new Promise((resolve, reject) => {
		try {
			connection.query(
				"SELECT * FROM users WHERE id = ? AND user_type=2 AND status=1",
				[id],
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
						resolve(results[0]); // User found, return the first result
					}
				}
			);
		} catch (error) {
			reject({
				success: false,
				message: `Check User By Id Error: ${error.message}`,
			});
		}
	});
};
const checkUserByEmail = ({ email }) => {
	return new Promise((resolve, reject) => {
		try {
			connection.query(
				"SELECT * FROM users WHERE email = ? AND user_type=2 AND status=1",
				[email],
				(error, results) => {
					if (error) {
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
						resolve(results[0]); // User found, return the first result
					}
				}
			);
		} catch (error) {
			reject({
				success: false,
				message: `Check User By Email Eror: ${error.message}`,
			});
		}
	});
};
const insertUser = ({ name, email, phone, password }) => {
	return new Promise((resolve, reject) => {
		try {
			const sql =
				"INSERT INTO users (name,email, phone, password) VALUES (?,?, ?, ?)";
			const values = [name, email, phone, password];

			connection.query(sql, values, (error, results) => {
				if (error) {
					return reject({
						success: false,
						message: "Database query failed",
						error,
					});
				}
				resolve(results.insertId);
			});
		} catch (error) {
			reject({
				success: false,
				message: `Insert User Error: ${error.message}`,
			});
		}
	});
};
const updateUser = async (userId, { name, phone, image }) => {
	var CURRENT_TIMESTAMP = mysql.raw("CURRENT_TIMESTAMP()");
	try {
		return new Promise((resolve, reject) => {
			try {
				const sql =
					"UPDATE users SET name=?, phone=?,image=?,updated_at=?  WHERE id = ?";
				const values = [name, phone, image, CURRENT_TIMESTAMP, userId];

				connection.query(sql, values, (error, results) => {
					if (error) {
						return reject({
							success: false,
							message: "Database query failed",
							error,
						});
					}
					if (results.affectedRows > 0) {
						try {
							const userData = checkUserById({ id: userId });
							resolve(userData);
						} catch (fetchError) {
							reject({
								success: false,
								message: "Failed to fetch updated user data",
								error: fetchError,
							});
						}
					} else {
						connection.end();
						resolve({
							success: false,
							message: "No user found with the given ID",
						});
					}
					//resolve(results.affectedRows);
				});
			} catch (error) {
				reject({
					success: false,
					message: `Update User Error: ${error.message}`,
				});
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: `Register Controller Error : ${error.message}`,
		});
	}
};

module.exports = {
	checkUserById,
	checkUserByEmail,
	insertUser,
	updateUser,
};
