var mysql = require("mysql");
const prop = require("./dbProperty");
module.exports = {
	getConnection: () => {
		return mysql.createConnection(prop);
	},
};
