const moment = require('moment')

const {getArchive} = require('./model')

module.exports = {
    GET: async(_,res) => {
        try {
            
            const data = await (await getArchive()).filter(e => e.deleted_at = moment(e.deleted_at).format('l'))

            res.json({
                success:true,
                data
            })

        } catch (error) {
            console.log(error);
            res.sendStatus(500)
        }
    }
}