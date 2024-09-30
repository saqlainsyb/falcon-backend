const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const { parseExcel, parseCSV } = require('../utils/parseFile');

const registerUsers = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded!' });
        }

        const fileExtension = path.extname(file.originalname).toLowerCase();

        let users = [];

        // Process file based on its extension
        if (fileExtension === '.xlsx') {
            users = await parseExcel(file.path);
        } else if (fileExtension === '.csv') {
            users = await parseCSV(file.path);
        } else {
            return res.status(400).json({ message: 'Unsupported file format!' });
        }

        // Save users to MongoDB
        await User.insertMany(users);

        // Delete the file after processing
        fs.unlinkSync(file.path);

        return res.status(200).json({ message: 'Users registered successfully!' });

    } catch (error) {
        return res.status(500).json({ message: 'Error processing file', error: error.message });
    }
};

module.exports = { registerUsers };
