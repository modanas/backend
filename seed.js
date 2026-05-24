import mongoose from "mongoose";
import dotenv from "dotenv";
import foodModel from "./models/foodModel.js";
import foods from "./config/seedData.js";

dotenv.config();

const seedDB = async () => {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected successfully!");

    console.log("Dropping existing food collection to start fresh...");
    await foodModel.deleteMany({});
    console.log("Existing collection dropped successfully!");

    console.log(`Seeding ${foods.length} premium menu products...`);
    const inserted = await foodModel.insertMany(foods);
    console.log(`Successfully seeded ${inserted.length} products!`);

    await mongoose.disconnect();
    console.log("Database disconnected. Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed with error:", error.message);
    process.exit(1);
  }
};

seedDB();
