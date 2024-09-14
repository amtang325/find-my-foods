// User using the site (includes name, email, password, description, etc.)
const mongoose = require('mongoose');
const User = require('./User.js');

const friendSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        friends: [{
            type: mongoose.Types.ObjectId,
            ref: User
        }]
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Friend', friendSchema);