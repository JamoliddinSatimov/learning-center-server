const { fetch, fetchAll } = require('../../utils/postgres')

const GETUSERS = ` SELECT u.user_id, u.user_name, c.course_title AS job, u.created_at AS time FROM users u Join courses c ON u.profession_id = c.course_id where user_status = $1`

const ADDUSER = `INSERT INTO users(user_name, user_password, user_status, profession_id) 
VALUES($1, crypt($2, gen_salt('md5')), $3, $4 ) RETURNING *
`

const DELETEUSER = ` DELETE FROM users where user_id = $1 RETURNING *`

const UPDATEUSER = ` UPDATE users SET user_name = $1, 
user_password = CASE WHEN length($2)>0 THEN $2 ELSE users.user_password END, profession_id = $3 WHERE user_id = $4 RETURNING *`

const GETSTUDENT = `SELECT
    u.user_id,
    u.user_name,  
    json_agg(
        json_build_object(
            'id', sc.id,
            'name', g.group_name
        )
    ) AS groups,
    u.created_at AS time
from 
    student_courses sc 
right join 
    users u 
ON 
    u.user_id = sc.student_id 
left join 
    groups g 
ON 
    sc.group_id = g.group_id
WHERE 
    u.user_status = $1   
GROUP BY 
    u.user_id
`

const TEACHERS_for_GROUPS = ' SELECT * FROM users WHERE profession_id = $1'

const LOGINUSER = ' SELECT * FROM users WHERE user_name = $1 and user_password = crypt($2, user_password)'

const GETGROUPS_for_teachers = ' SELECT * FROM groups WHERE teacher_id = $1'

const GETGROUPS_for_students = `
SELECT 
    g.group_id,
    g.group_name,
    g.created_at
FROM 
    student_courses sg
INNER JOIN 
    users u 
ON 
    sg.student_id = u.user_id
INNER JOIN
    groups g 
ON  
    sg.group_id = g.group_id       
WHERE
    u.user_id = $1 
`


const STUDENT_HOMEWORKS = `
SELECT 
    h.id,
    h.title,
    h.created_at
FROM 
    homeworks h
INNER JOIN 
    groups g
ON 
    g.group_id = h.groupid
WHERE
    g.group_id = $1                


` 

const TEACHER_ADD_HOMEWORKS = `
INSERT INTO homeworks(title, groupid) VALUES($1, $2) RETURNING*   
`

const UPDATE_HOMEWORK = `
UPDATE 
    homeworks 
SET 
    title = CASE 
        WHEN length($1)>0 THEN $1 ELSE homeworks.title
    END,
    groupid = CASE 
        WHEN $2>0 THEN $2 ELSE homeworks.groupid
    END
WHERE
    homeworks.id = $3    
RETURNING *       
`



const getUsers = () => fetchAll(GETUSERS,['teacher'])
const postUsers = (...params) => fetch(ADDUSER, params)
const deleteUser = (...params) => fetch(DELETEUSER, params)
const putUser = (...params) => fetch(UPDATEUSER, params)

const getTeachers = (...params) => fetchAll(TEACHERS_for_GROUPS, params)
const getStudents = () => fetchAll(GETSTUDENT, ['student'])

const login = (...params) => fetch(LOGINUSER, params)
const getGroups = (...params) => fetchAll(GETGROUPS_for_teachers, params)
const studentGroups = (...params) => fetchAll(GETGROUPS_for_students, params)
const studentHomeworks = (...params) => fetchAll(STUDENT_HOMEWORKS, params)
const addHomework = (...params) => fetch(TEACHER_ADD_HOMEWORKS,params)
const updateHomework = (...params) => fetch(UPDATE_HOMEWORK, params)


module.exports = {
    login,
    getUsers,
    postUsers,
    deleteUser,
    putUser,

    getTeachers,
    getStudents,

    getGroups,
    studentGroups,
    studentHomeworks,
    addHomework,
    updateHomework,
    
    
}