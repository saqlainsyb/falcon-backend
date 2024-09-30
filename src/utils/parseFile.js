const xlsx = require('xlsx');
const csvParser = require('csv-parser');
const fs = require('fs');

// Define a mapping of possible column names
const columnMapping = {
    name: ['Name of the student', 'name', 'Name', 'Student Name'],
    email: ['email', 'Email'],
    phone: ['phone number', 'phone', 'Phone'],
    degree: ['degree', 'Degree'],
    specialization: ['specialization', 'Specialization'],
    year: ['year', 'Year']
};

// Function to find the actual key from the mapping
const getMappedColumnName = (header) => {
    for (const [key, possibleNames] of Object.entries(columnMapping)) {
        if (possibleNames.includes(header)) {
            return key;
        }
    }
    return null; // Return null if no match found
};

// Parse Excel files
const parseExcel = async (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const sheet = workbook.Sheets[sheet_name_list[0]];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    const users = jsonData.map(row => {
        const mappedRow = {};
        for (const header of Object.keys(row)) {
            const mappedName = getMappedColumnName(header);
            if (mappedName) {
                mappedRow[mappedName] = row[header];
            }
        }
        return mappedRow;
    });

    return users;
};

// Parse CSV files
const parseCSV = async (filePath) => {
    const users = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                const mappedRow = {};
                for (const header of Object.keys(row)) {
                    const mappedName = getMappedColumnName(header);
                    if (mappedName) {
                        mappedRow[mappedName] = row[header];
                    }
                }
                users.push(mappedRow);
            })
            .on('end', () => resolve(users))
            .on('error', (error) => reject(error));
    });
};

module.exports = { parseExcel, parseCSV };
