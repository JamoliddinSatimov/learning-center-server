const {fetch, fetchAll} = require('../../utils/postgres')

const GETCOURSES = 'SELECT * FROM courses'

const ADDCOURSE = 'INSERT INTO courses(course_title, course_price) VALUES($1,$2) RETURNING *'

const DELETE = 'DELETE FROM courses where course_id = $1 RETURNING *'

const GetCourses = () => fetchAll(GETCOURSES)
const deleteCourse = (...params) => fetch(DELETE, params)
const postCourse = (...params) => fetch(ADDCOURSE, params)

module.exports = {
    GetCourses,
    deleteCourse,
    postCourse
}