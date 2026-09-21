const express = require('express');
const router = express.Router();
const multer = require('multer');
const bodyParser = require('body-parser');
const facultyMappingController = require('../controllers/FacultySubjectMap');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));



router.post('/add/faculty/subject/mapping', (req, res) => {
  facultyMappingController.addFacultyMap(req, res);
});


// ✅ CRUD routes
router.get('/facultySubjectMapping', (req, res) => facultyMappingController.getFacultyMaps(req, res));
router.delete('/delete/faculty/subject/mapping/:id', (req, res) => facultyMappingController.deleteFacultyMap(req, res));
router.get('/timeslot/:id', (req, res) => facultyMappingController.getFacultyMap(req, res));
router.put('/edit/faculty/subject/mapping/:id', (req, res) => facultyMappingController.editFacultyMap(req, res));

module.exports = router;