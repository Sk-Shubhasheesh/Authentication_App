const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true, // whitespace characters should be removed from the "name" field before saving it to the database.
    },
    email:{
        type: String,
        required: true,
        trim:true,
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type: String,
        enum: ["Admin", "Student", "Visitor"]
    }
});

module.exports = mongoose.Schema("user", userSchema);