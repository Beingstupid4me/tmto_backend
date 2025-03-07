const UserModel = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Sign up successful", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false, error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(403).json({ message: "Auth Failed: Email or password is wrong", success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: "Auth Failed: Email or password is wrong", success: false });
    }

    const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: "5m" });

    res.status(200).json({ message: "Login successful", success: true, jwtToken, email });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false, error: err.message });
  }
};

module.exports = { signup, login };
