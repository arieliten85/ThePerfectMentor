
const router = require("express").Router();


router.get("/admin", (req, res) => {
    res.send({
        error: null,
        data: {
            title: 'mi ruta protegida',
            user: req.user
        }
    })
})



module.exports = router;