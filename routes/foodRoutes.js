import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import uploads from "../config/multer.js"

const foodRouter = express.Router();

foodRouter.post("/add", uploads.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)

export default foodRouter