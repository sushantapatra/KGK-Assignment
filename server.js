const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer"); //file upload
const cookieParser = require("cookie-parser");

// const con = require("./config/dbConnection");
// const connection = con.getConnection();
// connection.connect();

//dotenv configuration
dotenv.config();

//rest objectt
const app = express();

//middlewares
app.use(express.json()); // fix the json parse error in pass data inside the body
app.use(cookieParser());
app.use(morgan("dev"));
// htmlFor parsing application/x-www-htmlForm-urlencoded
app.use(express.urlencoded({ extended: true }));

const corsOptions12 = {
	// origin:'https://abc.onrender.com',
	origin: "http://localhost:3000",
	AccessControlAllowOrigin: "*",
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
};
const corsOptions = {
	origin: ["http://localhost:3000"], // Frontend URL
	//methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true, // Required to receive cookies
};
app.use(cors(corsOptions));

//routes
app.get("/", (req, res) => {
	res.status(200).send({
		message: "Server running...",
	});
});

// Define all User Router Here
app.use("/api/v1/user", require("./routes/userRouter"));
app.use("/api/v1/post", require("./routes/postRouter"));
app.use("/api/v1/plugin", require("./routes/pluginRouter"));
app.use("/api/v1/imageslider", require("./routes/imagesliderRouter"));
//connection.end();

//listen port
const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(
		`Server running in ${process.env.NODE_MODE} Mode on port ${port}`.bgCyan
			.white
	);
});
