const {fetch, fetchAll} = require('../../utils/postgres')

const GETGROUPS = ' SELECT g.group_id, g.group_name, u.user_name, g.created_at FROM groups g LEFT JOIN users u ON g.teacher_id = u.user_id order by g.created_at'

const GETSOME = `
    SELECT g.group_id, g.group_name from groups g where courseid = $1
`

const POST_STUDENT_GROUPS = `
    INSERT INTO student_courses(student_id, group_id)
    VALUES($1, $2) RETURNING *
`

const DELETE_GROUPS = ` DELETE FROM groups where group_id = $1 RETURNING * `

const ADDGROUP = ` INSERT INTO groups(group_name, courseId, teacher_id) 
VALUES($1,$2,$3) RETURNING * `

const getGroupsOnCourses = (...params) => fetchAll(GETSOME, params)
const getGroups = () => fetchAll(GETGROUPS)
const deleteGroups = (...params) => fetch(DELETE_GROUPS, params)
const join_student = (...params) => fetch(POST_STUDENT_GROUPS, params)
const postGroup = (...params) => fetch(ADDGROUP, params)

module.exports = {
    getGroupsOnCourses,
    join_student,
    getGroups,
    postGroup,
    deleteGroups
}