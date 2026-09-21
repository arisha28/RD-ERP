const Timeslot = require('../models/Timeslot')

async function addTimeslot(req, res) {
    try {
        let timeslot = new Timeslot(req.body)

        await timeslot.save()
        console.log("data saved sucessfully....");

        res.status(200).send({ success: true, message: 'data saved successfully' })

    } catch (error) {
        res.status(500).send({ success: false, message: 'something went wrong' })
        console.log(error);
    }

}
async function getTimeslots(req, res) {
    try {
        let timeslots = await Timeslot.find({
            session: { $regex: new RegExp(req.query.session, "i") }
        });
        res.status(200).send({ success: true, data: timeslots })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: 'Something went wrong..!' });
    }
}


async function getTimeslot(req, res) {
    try {
        let timeslotId = req.params.id;
        let timeslot = await Timeslot.findOne({ _id: timeslotId })
        console.log("Sahil "+timeslot);
        
        res.status(200).send({ success: true, data: timeslot })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Something went wrong...' });
    }
}

async function editTimeslot(req, res) {
    try {
        let timeslotId = req.params.id;
        let timeslot = await Timeslot.findOne({ _id: timeslotId })
        Object.assign(timeslot, req.body)
        await timeslot.save();
        res.status(200).send({ success: true, message: 'Subject has been updated' })

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Something went wrong in updating Subject.' })
    }
}
async function deleteTimeslot(req, res) {
    try {
        let id = req.params.id;
        const result = await Timeslot.deleteOne({ _id: id })

        if (result) {
            res.status(200).send({ success: true, message: 'Branch Deleted Successfull...' });
        } else {
            res.status(500).send({ success: false, message: 'Can not Delete Branch' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: 'Can not Delete, Something went wrong..!' });
    }
}
module.exports = {
    addTimeslot,
    getTimeslots,
    getTimeslot,
    editTimeslot,
    deleteTimeslot
}