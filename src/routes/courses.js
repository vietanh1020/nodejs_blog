const express = require('express')
const router = express.Router()

const coursesController = require('../app/controllers/CoursesController')

router.delete('/:id/hard-delete', coursesController.hardDelete)
router.delete('/multiple-delete', coursesController.multipleDelete)
router.post('/multiple-action-courses', coursesController.multipleActionCourse)
router.delete('/:id', coursesController.deleteCourse)
router.get('/profile-teacher', coursesController.profile)
router.patch('/:id/restore', coursesController.restoreCourse)
router.get('/create', coursesController.showForm)
router.post('/store', coursesController.createCourse)
router.get('/:id/edit', coursesController.edit)
router.put('/:id', coursesController.update)
router.get('/:slug', coursesController.show_detail)

module.exports = router