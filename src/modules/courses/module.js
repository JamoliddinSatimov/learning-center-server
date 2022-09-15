const {GetCourses , deleteCourse, postCourse} = require('./model')
const moment = require('moment')

module.exports = {
    GET: async (_,res) => {
        try {
            const data = await (await GetCourses()).filter(e => e.created_at = moment(e.created_at).format('l'))
            return res.json({
                success:true,
                data
            })
        } catch (error) {
            console.log(error);
            res.sendStatus(500)
        }
    },

    DELETE : async (req,res) => {
        try {

            const { id } = req.body

            const deletedCourse = await deleteCourse(id)

            res.json({
                success:true,
                data:deletedCourse
            })
            
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)

        }
    },

    POST: async (req,res) => {
        try {

            const { name, price } = req.body

            const createdCourse = await postCourse(name, price)

            res.status(201).json({
                success:true,
                data:createdCourse
            })
            
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)

        }
    }
}