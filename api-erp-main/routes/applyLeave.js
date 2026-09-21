const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const ApplyLeaveController = require('../controllers/ApplyLeaveController')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: false
}))
router.post('/add/leave', (req, res) => {
    ApplyLeaveController.addLeave(req, res)
})
module.exports = router