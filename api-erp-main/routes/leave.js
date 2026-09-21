const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const LeaveController = require('../controllers/LeaveController')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: false
}))

router.post('/add/leave', (req, res) => {
    LeaveController.addLeave(req, res)
})

router.get('/leaves', (req, res) => {
    LeaveController.getLeaves(req, res);
})
// ----------
// router.get('/leave/:id', (req, res) => {
//     LeaveController.getLeave(req, res);
// })

router.put('/edit/leave/:id', (req, res) => {
    LeaveController.editLeave(req, res);
})
router.get('/leave/for/edit/:id' , (req, res) => {
    LeaveController.getleaveForEdit(req, res)
})

module.exports = router