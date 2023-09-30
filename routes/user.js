const express = require('express');
const router = express.Router();

const {signup, login} = require('../Controller/Auth');
const{auth, isStudent, isAdmin} = require('../middlewares/auth_middleware');

router.post('/signup', signup);
router.post('/login', login);

// testing protected routes for single middleware
router.get('/test', auth, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Test'
    });
});

// Protected Route
router.get('/student', auth, isStudent, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for student'
    });
});

router.get('/admin', auth, isAdmin, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Admin'
    });
});

module.exports = router;