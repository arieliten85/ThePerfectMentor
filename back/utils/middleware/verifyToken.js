const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
const token = req.header('auth-token') // Captura el token del lado del cliente

if (!token) return res.status(401).send({ error: 'Acceso denegado' })
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET)
      req.user = verified
    next()

    } catch (error) {
      res.status(400).send({error: 'token no es válido'})
}
}


module.exports = verifyToken;



