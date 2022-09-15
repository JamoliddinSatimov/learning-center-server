const {fetchAll} = require('../../utils/postgres.js')

const deletedUsers = ` SELECT * from archive `

const getArchive = () => fetchAll(deletedUsers)

module.exports = {
    getArchive
}