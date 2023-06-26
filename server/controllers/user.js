import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  let errors = [];

  try {
    const user = await User.findOne({ email });

    if (!user) {
      errors.push("User already exists");
    }

    if (!email) {
      errors.push("Please enter a valid email");
    }

    if (!password) {
      errors.push("Please input password");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      errors.push("Please enter a valid email");
    }

    if (errors.length > 0) {
      req.flash("error", errors[0]);
      req.flash("formData", { email });
      res.redirect("/auth");
    } else {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        "alx",
        { expiresIn: "1h" }
      );
  
      req.session.user = user;
      req.session.token = token;
  
      res.status(200).redirect("/");
    }

  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;
  let errors = [];

  try {
    const existingUser = await User.findOne({ email });

    if (!email) {
      errors.push('Please enter a valid email')
    }

    
    if (password.length < 6) {
      errors.push("Password should be at least 6 character");
    }
    
    if (password !== confirmPassword) {
      errors.push("Passwords do not match")
    }
    
    if (existingUser) {
      errors.push('User already exists')
    }

    if (errors.length > 0) {
      req.flash("error", errors[0]);
      req.flash("formData", { name, email });
      res.redirect("/auth");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await User.create({
        email,
        password: hashedPassword,
        name,
      });
  
      // const token = jwt.sign(
      //   { email: result.email, id: result._id },
      //   "alx",
      //   { expiresIn: "1h" }
      // );
  
      // console.log(token);
  
      req.flash("success_msg", "You are now registered and can log in");
      req.flash("formData", { email });
      res.redirect("/auth");
    }
  } catch (error) {
    console.error(error);
    req.flash("error", "An error occurred while registering");
    req.flash("formData", { name, email });
    res.redirect("/auth");
  }
};


export const logout = (req, res) => {
  if (req.session) {
    req.session?.destroy();
  }
  res.redirect("/");
};