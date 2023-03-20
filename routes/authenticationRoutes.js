const express = require('express');
const router = expresss.Router();
const authenticationController = require('/Users/owner/Desktop/M5A1/controllers/authenticationController');

router.get('/signup', authenticationController.register);
router.post('/signup', authenticationController.signup);
router.post('/login', authenticationController.login);

router.post('/logout', authenticationController.logout);

module.exports = router;