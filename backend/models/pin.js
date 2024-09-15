// name: string
// description: string
// latitude: float/double
// longitude: float/double
// id: number
const mongoose = require('mongoose');
const User = require('./User.js');

const pinSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        latitude: {
            type: mongoose.Types.Decimal128,
            required: true,
        },
        longitude: {
            type: mongoose.Types.Decimal128,
            required: true,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    }
)

module.exports = mongoose.model('Pin', pinSchema);