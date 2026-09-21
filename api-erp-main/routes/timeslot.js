const express = require('express');
const router = express.Router();
const multer = require('multer');
const bodyParser = require('body-parser');
const TimeslotController = require('../controllers/TimeslotController');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/add/timeslot', (req, res) => {
  TimeslotController.addTimeslot(req, res);
});

// ✅ CRUD routes
router.get('/timeslots', (req, res) => TimeslotController.getTimeslots(req, res));
router.delete('/delete/timeslot/:id', (req, res) => TimeslotController.deleteTimeslot(req, res));
router.get('/timeslot/:id', (req, res) => TimeslotController.getTimeslot(req, res));
router.put('/edit/timeslot/:id', (req, res) => TimeslotController.editTimeslot(req, res));

module.exports = router;