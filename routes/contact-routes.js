const express = require('express');
const router = express.Router();

const contactController  = require('../controllers/contact-controller');
const ContactController = new contactController();

router.get('/contacts', ContactController.getContacts);

module.exports = router;