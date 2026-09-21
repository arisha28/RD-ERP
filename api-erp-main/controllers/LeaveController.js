const Leave = require('../models/Leave');
const Timeslot = require('../models/Timeslot');
async function addLeave(req, res) {
    try {
        let leave = new Leave(req.body)

        await leave.save()
        console.log("data saved sucessfully....");

        res.status(200).send({ success: true, message: 'data saved successfully' })

    } catch (error) {
        res.status(400).send({ success: false, message: 'something went wrong' })
        console.log(error);
    }

}

async function getLeaves(req, res) {
    try {
        let leaves = await Leave.find({
            applicant: { $regex: new RegExp(req.query.applicant, "i")}
        })
        console.log(leaves)
        res.status(200).send({ success: true, data: leaves })
    } catch (error) {
        console.log(error)
        res.status(400).send({ success: false, message: 'Something went wrong..!' });
    }
}
async function getleaveForEdit(req, res) {
    try {
        let id = req.params.id;
        let leave = await Leave.findOne({_id: id})
        res.status(200).send({data: leave})
    } catch(err) {
        console.log(err)
        res.status(400).send({ message: "something went wrong"})
    }
}



async function editLeave(req, res) {
    try {
        let id = req.params.id;
        await Leave.updateOne({_id: id}, req.body )
        res.status(200).send({ success: true, message: 'Leave has been updated' })

    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: 'Something went wrong in updating Leave.' })
    }
}



module.exports = {
    addLeave,
    getLeaves,
    editLeave,
    getleaveForEdit
}