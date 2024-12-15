import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
const app = express();


app.use(cors());
app.use(express.json());

dotenv.config();

const Port = process.env.PORT || 3000;
const URI = process.env.MongoDBURI;

//connect to MongoDb
try {
	mongoose.connect(URI, {
  useNewUrlParser: true,
		useUnifiedTopology: true,
	  });
	 console.log("MongoDb is connected");
} catch (error) {
	console.log("Error: ", error);
}

//defining Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(Port, () => {
	console.log(`App is listening on port : ${Port}`);
});
