const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    name: String,
})

module.exports = new mongoose.model("User", userSchema);