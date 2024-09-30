const express = require('express');
const multer = require('multer');
const { registerUsers } = require('../controllers/userController');

const router = express.Router();

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Define the route for bulk registration
router.post('/bulk-register', upload.single('file'), registerUsers);

module.exports = router;
