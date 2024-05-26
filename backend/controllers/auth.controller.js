import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenSet from "../utils/generatetoken.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmpassword, gender } = req.body;

    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Password not match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    //Hash
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    //https://avatar-placeholder.iran.liara.run/

    const boyprofilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlprofilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashPassword,
      gender,
      profilepic: gender === "male" ? boyprofilepic : girlprofilepic,
    });
    if (newUser) {
      //generate JWT token
      generateTokenSet(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilepic: newUser.profilepic,
      });
    } else {
      res.status(500).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordcorrect = await bcryptjs.compare(password, user?.password || "");

    if (!user || !isPasswordcorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenSet(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilepic: user.profilepic,
    });
  } catch (error) {
    console.log("Error in login ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async(req, res) => {
     try{
       res.cookie("jwt", "", {maxAge : 0});
       res.status(200).json({message: "Logout successfully"})
     }catch(error){
      console.log("Error in logout ", error.message)
      res.status(500).json({error: "Internal server error"})
     }
};
