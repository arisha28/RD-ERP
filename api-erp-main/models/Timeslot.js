const mongoose = require('mongoose')
const  timestamps =require('mongoose-timestamps')
const Schema = mongoose.Schema
const TimeslotSchema = new Schema({
    session:{type:String,required:true},
    lecture_no:{type:String,required:true},
    lecture_time: {type:String,required:true},
    createdAt:Date,
    updatedAt:Date
})
TimeslotSchema.plugin(timestamps,{index:true})
module.exports=mongoose.model('timeslot',TimeslotSchema)