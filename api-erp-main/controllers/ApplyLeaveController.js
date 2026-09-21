const ApplyLeave = require('../models/ApplyLeave')

async function addLeave(req, res) {
    try {
        let leave = new ApplyLeave(req.body)
        await leave.save()
        console.log("data saved sucessfully....");
        res.status(200).send({ success: true, message: 'data saved successfully' })

    } catch (err) {
        res.status(500).send({ success: false, message: 'something went wrong' })
        console.log(err);
    }
}
module.exports = {
    addLeave
}