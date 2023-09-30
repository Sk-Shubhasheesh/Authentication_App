const express = require('express');
const router = express.Router();

const {signup} = require('../Controller/Auth');
router.post('/signup', signup);

module.exports = router;