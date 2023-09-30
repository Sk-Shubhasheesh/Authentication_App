const jwt = require('jsonwebtoken');
require('dotenv').config();


// authenatication check
exports.auth = (req, res, next) => {
    try {
       // extract JWT Token
        const token = req.body.token;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            })
        }

        // verify token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET) //gives token values
            req.user = payload;
        } catch (error) {
           return res.status(401).json({
               success: false,
               message: "token is invalid"
           });
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong, while verifying the token"
        });
    }
}

// authorization check
exports.isStudent = (req, res, next) => {
    try {
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Role is not matching"
        });
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Role is not matching"
        });
    }
}