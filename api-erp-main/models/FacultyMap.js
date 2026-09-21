const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamps')
const Schema = mongoose.Schema
const facultyMapSchema = new Schema ({
    session:{type: mongoose.Schema.Types.ObjectId, ref: 'Timeslot', required: true},
    firstName:{type: mongoose.Schema.Types.ObjectId, ref: 'faculty', required: true},
    course:{type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
    branch: {type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true},
    semester: {type: String, required: true},
    section: {type: String, required: true},
    subject: {type: String, required: true},
    createdAt: Date,
    updatedAt: Date
})
facultyMapSchema.plugin(timestamps, {index: true})
module.exports = mongoose.model('FacultyMap', facultyMapSchema)
