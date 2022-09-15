const moment = require('moment')
const { login, getUsers, postUsers, deleteUser, putUser, 
    getStudents,
    getTeachers,
    getGroups, studentGroups, studentHomeworks, addHomework, updateHomework,  } = require("./model");
const { sign } = require("../../utils/jwt")

module.exports = {

    LOGIN: async (req, res) => {
        try {
            const { name, password } = req.body

            const user = await login(name,password)

            if (!user){
                return res.status(400).json({
                    success:false,
                    message:"User did not exists"
                })
            }
            
            const token = sign({ id:user.user_id, role:user.user_status })
        
            res.json({
                success:true,
                message:"Logged successully",
                access_token:token,
                role:user.user_status
            })    

        } catch (error) {
            console.log(error);
            res.sendStatus(500)
        }
    },
    AUTHLOGIN:async (req ,res) => {

        const {role} = req.verifyId

        res.json({
            success:true,
            role
        })
    },

    GET: async (_,res) => {
        try {

            const data = await (await getUsers()).filter(e => e.time = moment(e.time).format('l'))

            return res.json({
                status: "OK",
                data
            })
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    },

    POST: async (req,res) => {
        try {

            const {name, password, status, categoryId} = req.body

            const data = await postUsers(name, password, status, categoryId)


            res.status(201).json({
                message: 'user has been created successfully',
                data
            })
            
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    },

    DELETE: async (req, res) => {
        try {
            const { id } = req.body
            console.log(id);
            const data = await deleteUser(id)

            res.json({
                message:'User has been deleted successfully',
                data
            })

        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    },

    PUT: async (req,res) => {
        try {
            
            const {editName, editPassword, editCategoryId, id} = req.body

            const data = await putUser(editName, editPassword, editCategoryId, id)

            res.json({
                message: 'user has been updated successfully',
                data
            })

        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    },

    GETTEACHERS: async (req,res) => {
        try {

            const { id } = req.body

            const data = await getTeachers(id)

            return res.json({
                status: "OK",
                data
            })
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    },

    GETSTUDENT : async(_,res) => {
        try {

            const data = await (await getStudents()).filter(e => e.time = moment(e.time).format('l'))

            return res.json({
                status: "OK",
                data
            })
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    },

    
    TEACHER_GROUPS: async (req, res) => {
        try {
            
            const { verifyId } = req

            const rows = await (await getGroups(verifyId.id)).filter(e => e.created_at = moment(e.created_at).format("lll"))

            res.json({
                success: true,
                data:rows,
                role:verifyId.role
            })
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    },
    STUDENT_GROUPS: async (req, res) => {
        try {
            
            const { verifyId } = req

            const groups = await (await studentGroups(verifyId.id)).filter(e => e.created_at = moment(e.created_at).format("lll"))


            res.json({
                success:true,
                data:groups,
                role:verifyId.role
            })
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    },
    STUDENT_HOMEWORKS : async (req, res) => {
        try {
            
            const { id } = req.body

            const homeworks = await (await studentHomeworks(id)).filter(e => e.created_at = moment(e.created_at).format('lll'))

            return res.json({
                success:true,
                data:homeworks
            })

        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    },
    ADD_HOMEWORK: async (req, res) => {
        try {
            
            const { title, groupId } = req.body

            const data = await addHomework(title, groupId)

            res.status(201).json({
                success:true,
                message: 'Homework has been created',
                data
            })

        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    },
    UPDATE_HOMEWORK: async (req, res) => {
        try {
            const { id } = req.params
            
            const { title, groupId } = req.body

            const data = await updateHomework(title, groupId, id)

            res.status(201).json({
                message: 'Homework has been updated',
                data
            })

        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    }  
}