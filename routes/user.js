const express = require('express');
const router = express.Router();

const {login, signup} = require('../Controller/Auth');

module.exports = router;