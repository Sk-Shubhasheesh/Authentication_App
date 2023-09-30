const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { options } = require('../routes/user');
require("dotenv").config();


// signup route handler
exports.signup = async(req, res) => {
    try {
        // get data
        const {name, email, password, role} = req.body;
        // check if user alredy exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already Exists'
            });
        }

        // secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing Password"
            });
        }

        // create entry for user
        const user = await User.create({
            name,email,password:hashedPassword,role
        })
        return res.status(200).json({
            success:true,
            message: 'User Created Successfully',
            data: user
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: 'User cannot be registered, Please try again later.'
        })
    }
}

// login
exports.login = async(req, res) => {
    try {
        // data fetch
        const {email, password} = req.body;
        // validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Plese fill all the details carefully"
            });
        }
        // check user is available or not
        let user = await User.findOne({email});
        // if user is not registered
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User is not registered"
            });
        }
        // create payload for jwt
        const payload = {
            email:user.email,
            id:user._id,
            role:user.role
        }
        // verify password & generate a JWT token
        if(await bcrypt.compare(password, user.password)){
            // password match
            // create jwt token
            let token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"2h"
            });
            // first convert user to object then add token
            user = user.toObject();
            user.token = token;
            // remove password for securtiy purpose and its remove from user object not database
            user.password = undefined;

            // creating cookie
            const options = {
                expires: new Date(Date.now() + 3 *24 * 60 * 60 * 1000),
                httpOnly:true // means not access in client side

            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token: token,
                user_details: user,
                message:"User Logged in successfully"

            });
        } else{
            // password not match
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure",
            err: error
        });
    }
}