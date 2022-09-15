const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../constants')
module.exports = {
    sign: (payload) => {
        return jwt.sign(payload, SECRET_KEY, {
            expiresIn: 36000
        })
    }
}    
    