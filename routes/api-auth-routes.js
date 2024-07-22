const express = require('express');
const router = express.Router();
const ApiAuthController = require('../controllers/api-auth-controller');

router.post('/api/auth/register', ApiAuthController.register);
router.post('/api/auth/login', ApiAuthController.login);

module.exports = router;