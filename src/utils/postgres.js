const { Pool } = require('pg')
const { DATABASE_URL } = require('../constants')


const pool = new Pool({
    connectionString:DATABASE_URL
})

const fetch = async (SQL, params) => {

    const client = await pool.connect()

    try {

        const { rows: [ data ] } = await client.query(SQL, params)

        return data

    } finally {
        client.release()
    }
}

const fetchAll = async (SQL, params) => {

    const client = await pool.connect()

    try {

        const { rows } = await client.query(SQL, params)

        return rows
    } finally {

        client.release()

    }
}

module.exports = {
    fetch,
    fetchAll
}