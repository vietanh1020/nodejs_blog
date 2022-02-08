const { count } = require('../models/Course');
const Courses = require('../models/Course')

class MeController {
    // [GET]  /me/stored-courses
    index(req, res, next) {
        let courseQuery = Courses.find({})
        if(req.query.hasOwnProperty('sort')){
            courseQuery = courseQuery.sort({
                [req.query.column] : req.query.type
            })
        }
        Promise.all([courseQuery.lean(), Courses.countDocumentsDeleted({}).lean()])
            .then(([courses, countDeleted]) => {
                res.render('me/stored-courses', {
                    courses,
                    countDeleted
                })
            })
            .catch(next)
    }

    // GET]  /me/trash/courses
    showTrashCourse(req, res, next) {
        
        Courses.findDeleted({}).lean()
            .then(courses => res.render('me/trash-courses', { courses }))
            .catch(next)
    }

}

module.exports = new MeController;