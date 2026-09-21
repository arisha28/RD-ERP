const FacultyMap = require('../models/FacultyMap')

async function addFacultyMap(req, res) {
    try {
        let facultyMap = new FacultyMap(req.body)

        await facultyMap.save()
        console.log("data saved sucessfully....");

        res.status(200).send({ success: true, message: 'data saved successfully' })

    } catch (error) {
        res.status(500).send({ success: false, message: 'something went wrong' })
        console.log(error);
    }

}
async function getFacultyMaps(req, res) {
    try {
        let facultyMaps = await FacultyMap.find({
            firstName: { $regex: new RegExp(req.query.session, "i") }
        });
        res.status(200).send({ success: true, data: facultyMaps })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: 'Something went wrong..!' });
    }
}


async function getFacultyMap(req, res) {
    try {
        let Id = req.params.id;
        let facultyMap = await FacultyMap.findOne({ _id: Id })
        console.log("Sahil "+facultyMap);
        
        res.status(200).send({ success: true, data: facultyMap })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Something went wrong...' });
    }
}

async function editFacultyMap(req, res) {
    try {
        let Id = req.params.id;
        let facultyMap = await FacultyMap.findOne({ _id: Id })
        Object.assign(facultyMap, req.body)
        await facultyMap.save();
        res.status(200).send({ success: true, message: 'Subject has been updated' })

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Something went wrong in updating Subject.' })
    }
}
async function deleteFacultyMap(req, res) {
    try {
        let id = req.params.id;
        const result = await FacultyMap.deleteOne({ _id: id })

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
    addFacultyMap,
    getFacultyMaps,
    getFacultyMap,
    editFacultyMap,
    deleteFacultyMap
}