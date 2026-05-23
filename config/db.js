// import mongoose from "mongoose";

// export const connectDB = async () => {
//  await mongoose.connect('mongodb://modanas:6291799667@cluster0.snrgf.mongodb.net/food-del')
//  .then(() => console.log("DB Connected"))
// }

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
	try {
		await mongoose.connect(
			process.env.MONGO_URI,
		);
		console.log("DB Connected");
	} catch (error) {
		console.error("DB connection failed:", error.message);
		setTimeout(() => {
			process.exit(1);
		}, 1000);
	}
};



