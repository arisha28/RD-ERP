const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamps')
const Schema = mongoose.Schema
const LeaveSchema = new Schema({
  session:{ type: String, required: true},
  leave_Name: { type: String, required: true },
  leave_ShortName: { type: String, required: true },
  no_of_leaves: { type: Number, required: true },
  applicant: { type: String, required: true }
})
LeaveSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('leave', LeaveSchema)