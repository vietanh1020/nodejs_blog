const res = require('express/lib/response');
// const { findById } = require('../models/Course');
const Courses = require('../models/Course')

class CoursesController {

    // [GET] 
    show_detail(req, res, next) {
        Courses.findOne({ slug: req.params.slug }).lean()
            .then(course => {
                res.render('courses/show', { course })
            })
            .catch(next)
    }

    // [POST] /courses/store
    createCourse(req, res, next) {
        const course = new Courses(req.body)
        course.save()
            .then(() => res.redirect('/'))
            .catch(next)
    }

    // [GET]  /courses/create
    showForm(req, res) {
        res.render('courses/createCourse')
    }

    // [GET] /id/edit
    edit(req, res, next) {
        Courses.findById(req.params.id).lean()
            .then(course => {
                res.render('courses/edit', { course })
            })
            .catch(next)
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        const query = { _id: req.params.id };
        Courses.findOneAndUpdate(query, req.body)
            .then(res.redirect('/me/stored-courses'))
            .catch(next)
    }

    // [GET] /courses/profile-teacher
    profile(req, res, next) {
        res.render('courses/profile')
    }

    // [DELETE] /courses/:id
    deleteCourse(req, res, next) {
        Courses.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }


    // [DELETE] /courses/:id
    hardDelete(req, res, next) {
        Courses.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] courses/multiple-delete
    multipleDelete(req, res, next) {
        Courses.delete({ _id: { $in: req.body.courses } })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [POST] /courses/multiple-restore-course
    multipleActionCourse(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                Courses.restore({ _id: { $in: req.body.courses } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case 'hard-delete':
                Courses.deleteOne({ _id: { $in: req.body.courses } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                console.log('Method  multiple Action Course invalid')
        }
    }

    // [PATCH] /courses/:id/restore
    restoreCourse(req, res, next) {
        Courses.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

}
module.exports = new CoursesController;