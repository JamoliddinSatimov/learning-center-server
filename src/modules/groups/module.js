const {getGroupsOnCourses, postGroup, deleteGroups, join_student, getGroups} = require('./model')
const moment = require('moment')

module.exports = {

    GET: async (_,res) => {
        try {
            
            const groups = await (await getGroups()).filter(e => e.created_at = moment(e.created_at).format("lll") )

            res.json({
                success:true,
                data:groups
            })

        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    },

    GETGROUPS : async(req,res) => {
        try {
            
            const { categoryId } = req.body
 
            const groups = await getGroupsOnCourses(categoryId)

            res.json({
                success:true,
                groups
            })

        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    },

    POST: async (req,res) => {
        try {
            
            const {name, courseId, teacherId} = req.body

            const data = await postGroup(name, courseId, teacherId)

            res.status(201).json({
                success:true,
                message:'group created successfully',
                data
            })


        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    },

    DELETE: async(req,res) => {
        try {
            
            const { id } = req.body
 
            const groups = await deleteGroups(id)

            res.json({
                success:true,
                groups
            })

        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    },

    STUDENTJOINGROUP: async(req,res) => {
        try {
            
            const {student_id, group_id} = req.body

            const data = await join_student(student_id, group_id)

            res.json({
                success:true,
                message:'student joined group',
                data
            })

        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    }
}