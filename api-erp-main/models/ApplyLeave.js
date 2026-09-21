const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamps')
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    session: { type: String, required: true },
    typeOfLeave: { type: String, required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    noOfLeave: { type: Number, required: true },
    status: { type: String, default: 'Active', enum: ['Active', 'InActive'] },
    createdAt: Date,
    updatedAt: Date
})
module.exports = mongoose.model('leave', leaveSchema)