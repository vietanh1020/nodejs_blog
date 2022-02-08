const express = require('express')
const router = express.Router()

const meController = require('../app/controllers/MeController')

router.use('/stored-courses', meController.index)
router.use('/trash-courses', meController.showTrashCourse)

module.exports = router