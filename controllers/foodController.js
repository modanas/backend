import foodModel from "../models/foodModel.js";
import fs from "fs";
import foods from "../config/seedData.js";

//add food item

const addFood = async (req, res) => {
	try {
		// Use Cloudinary URL if available, otherwise fallback to local filename (excluding uploads/ path)
		let image_filename = req.file.path && req.file.path.startsWith("http") 
			? req.file.path 
			: req.file.filename;

		const food = new foodModel({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			image: image_filename,
			category: req.body.category,
		});

		await food.save();
		res.json({ success: true, message: "Food Added" });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Error" });
	}
};

// all food list
const listFood = async (req, res) => {
	try {
		const foods = await foodModel.find({});
		res.json({ success: true, data: foods });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Error" });
	}
};

// remove food item
const removeFood = async (req, res) => {
	try {
		const food = await foodModel.findById(req.body.id);

		// Only attempt to unlink if the image is stored locally (doesn't start with HTTP)
		if (food.image && !food.image.startsWith("http")) {
			fs.unlink(`uploads/${food.image}`, () => {});
		}

		await foodModel.findByIdAndDelete(req.body.id);
		res.json({ success: true, message: "Food removed successfully" });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Error" });
	}
};

// seed food database with default products
const seedFood = async (req, res) => {
	try {
		await foodModel.deleteMany({});
		await foodModel.insertMany(foods);
		res.json({ success: true, message: "Database seeded successfully with default products!" });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Failed to seed database" });
	}
};

export {addFood, listFood, removeFood, seedFood}