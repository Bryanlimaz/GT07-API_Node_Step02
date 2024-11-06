const express = require('express');
const router = express.Router();
const { loginAuth } = require('../controllers/authControllers');

router.post('/login', loginAuth);



module.exports = router;