const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    degree: { type: String, required: true },
    specialization: { type: String, required: true },
    year: { type: Number, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
