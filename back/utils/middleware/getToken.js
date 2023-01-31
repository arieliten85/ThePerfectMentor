const jwt = require('jsonwebtoken')

const getToken = (token) => {

    try {
      const UserVerified = jwt.verify(token, process.env.TOKEN_SECRET)
      return {error:false, data: UserVerified}

    } catch (error) {
      return {error:true, data:"Token no es válido"}
    }
}

module.exports = getToken;

