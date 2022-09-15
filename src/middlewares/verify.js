const { verify, JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken')
const { SECRET_KEY } = require('../constants');


const authVerify = (req, res, next) => {
    try {
        
        const { access_token } = req.headers
        
        if (!access_token) {
            return res.status(400).json({
                message: 'token did not exists',
                success:false
            })
        }

        verify(access_token, SECRET_KEY, (err, decode) => {
            if (err instanceof JsonWebTokenError) {
                return res.status(400).json({
                    message: 'Invalid token',
                    success:false
                })
            }

            if (err instanceof TokenExpiredError) {
                return res.status(400).json({
                    message:'Time is up',
                    success:false
                })
            }

            req.verifyId = decode

            next()
        })

    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

module.exports = {
    authVerify
}