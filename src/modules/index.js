const express = require('express')
const router = express.Router()

const verifyMiddleware = require('../middlewares/verify')

const users = require('./users/module')
const courses = require('./courses/module')
const groups = require('./groups/module')
const archive = require('./archive/module')

router
    .post("/login", users.LOGIN)
    .get("/admin/login", verifyMiddleware.authVerify, users.AUTHLOGIN)

    .get("/users", verifyMiddleware.authVerify, users.GET )
    .post("/users", verifyMiddleware.authVerify, users.POST )
    .delete("/users", verifyMiddleware.authVerify, users.DELETE)
    .put('/users', verifyMiddleware.authVerify, users.PUT )

    .post("/admin/teachers", verifyMiddleware.authVerify, users.GETTEACHERS)
    .get("/admin/students", verifyMiddleware.authVerify, users.GETSTUDENT)

    .post("/admin/students/groups", verifyMiddleware.authVerify, groups.GETGROUPS)
    .post("/admin/groups/students", verifyMiddleware.authVerify, groups.STUDENTJOINGROUP)

    .get('/courses', verifyMiddleware.authVerify, courses.GET)
    .delete("/courses", verifyMiddleware.authVerify, courses.DELETE)
    .post("/courses", verifyMiddleware.authVerify, courses.POST)

    .get("/groups", verifyMiddleware.authVerify, groups.GET)
    .post("/groups", verifyMiddleware.authVerify, groups.POST)
    .delete("/groups", verifyMiddleware.authVerify, groups.DELETE)


    .get("/teacher/groups", verifyMiddleware.authVerify, users.TEACHER_GROUPS)
    .get("/student/groups", verifyMiddleware.authVerify, users.STUDENT_GROUPS)
    .post("/student/homeworks", verifyMiddleware.authVerify, users.STUDENT_HOMEWORKS)
    .get("/teacher/homework/:id", verifyMiddleware.authVerify, users.STUDENT_HOMEWORKS)
    .post("/teacher/homework", verifyMiddleware.authVerify, users.ADD_HOMEWORK )
    
    .put("/teacher/homework/:id", verifyMiddleware.authVerify, users.UPDATE_HOMEWORK )

    .get("/archive", verifyMiddleware.authVerify, archive.GET)

    

    
module.exports = router    