import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userModel.findOne({ email: email });
		if(!user) {
			 return res.json({success : false, message : "User does not exist"})
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.json({ success: false, message: "Incorrect password" });
		}

		//if password is matching
		const token = createToken(user._id);
		res.json({ success: true, token: token });

	} catch (error) {
		console.log("Error");
		res.json({ success: false, error: "Error" });
	}
};



const createToken = (id) => {
	// console.log("JWT_SECRET:", process.env.JWT_SECRET);
	return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user
const registerUser = async (req, res) => {
	const { name, email, password } = req.body; //destructuring
	try {
		// checking if user already exists
		const exists = await userModel.findOne({ email: email });
		if (exists) {
			return res.json({ success: false, message: "User already exists" });
		}

		//validating email format and strong password
		if (!validator.isEmail(email)) {
			return res.json({
				success: false,
				message: "Please enter a valid email",
			});
		}
		if (password.length < 8) {
			return res.json({
				success: false,
				message: "Please enter a strong password",
			});
		}

		//hashing user password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		//creating new user
		const newUser = new userModel({
			name: name,
			email: email,
			password: hashedPassword,
		});
		const user = await newUser.save();
		const token = createToken(user._id);
		res.json({ success: true, token });
	} catch (error) {
		console.log("error");
		res.json({ success: false, message: "Error" });
	}
};

export { loginUser, registerUser };
