// User using the site (includes name, email, password, description, etc.)
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        // array of pins that they have
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema);