const mysql = require("mysql");
const con = require("../config/dbConnection");
const connection = con.getConnection();
//connection.connect();
const getAllPosts = () => {
	return new Promise((resolve, reject) => {
		try {
			connection.query(
				"SELECT posts.*,users.name FROM posts,users WHERE posts.status=1 and posts.user_id=users.id",
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
				message: `Get All Post Error: ${error.message}`,
			});
		}
	});
};
const getRandomPosts = () => {
	return new Promise((resolve, reject) => {
		try {
			connection.query(
				"SELECT posts.*, users.name FROM posts, users WHERE posts.status = 1 AND posts.user_id = users.id ORDER BY RAND() LIMIT 6",
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
				message: `Get Random Post Error: ${error.message}`,
			});
		}
	});
};
const getPostsByUserId = ({ user_id }) => {
	return new Promise((resolve, reject) => {
		try {
			connection.query(
				"SELECT * FROM posts WHERE user_id = ? AND status=1",
				[user_id],
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
				message: `Get Post By User Id Error: ${error.message}`,
			});
		}
	});
};
const insertPost = ({ title, slug, content, user_id }) => {
	return new Promise((resolve, reject) => {
		try {
			const sql =
				"INSERT INTO posts ( title, slug, content,user_id) VALUES (?,?,?,?)";
			const values = [title, slug, content, user_id];

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
				message: `Insert Post Error: ${error.message}`,
			});
		}
	});
};
const getPostsById = ({ id }) => {
	return new Promise((resolve, reject) => {
		try {
			connection.query(
				"SELECT  posts.*, users.name FROM posts,users WHERE posts.id = ? AND posts.status=1 AND posts.user_id = users.id",
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
				message: `Get Post By Id Error: ${error.message}`,
			});
		}
	});
};

const deletePost = (userId, postId) => {
	var CURRENT_TIMESTAMP = mysql.raw("CURRENT_TIMESTAMP()");
	return new Promise((resolve, reject) => {
		try {
			connection.query(
				"UPDATE posts SET status=2,updated_at=? WHERE user_id = ? AND id=?",
				[CURRENT_TIMESTAMP, userId, postId],
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

const updatePost = async (postId, { title, slug, content, user_id }) => {
	var CURRENT_TIMESTAMP = mysql.raw("CURRENT_TIMESTAMP()");
	try {
		return new Promise((resolve, reject) => {
			try {
				const sql =
					"UPDATE posts SET title=?, slug=?,content=?,user_id=?,updated_at=?  WHERE id = ?";
				const values = [
					title,
					slug,
					content,
					user_id,
					CURRENT_TIMESTAMP,
					postId,
				];

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
	getAllPosts,
	getRandomPosts,
	getPostsByUserId,
	getPostsById,
	deletePost,
	insertPost,
	updatePost,
};
