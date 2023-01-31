const router = require("express").Router();
const UserControler = require("../controllers/userControler");
const verifyToken = require("../utils/middleware/verifyToken")
const upload = require("../libs/storage")

router.get("/users", UserControler.allUsers)
router.get("/Stadistics", UserControler.allStadistics)
router.get("/users/:id", UserControler.getOneUser)
router.get("/search/:name", UserControler.getOneUserName)
router.get("/confirm/:token", UserControler.confirmMail)

router.post("/register",upload.single("image"), UserControler.userRegister)
router.post("/login", UserControler.userLogin)
router.post("/notification", UserControler.userLogin)

router.put("/edit/:id", UserControler.userEdit)
router.delete("/delete/:id", UserControler.userDelete)

router.get("/auth",verifyToken, (req, res) => {
    res.send({
        error: false,
        data: {
            user: req.user
        }
    })
})



module.exports = router;


