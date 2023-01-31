const router = require("express").Router();

const MessageController = require("../controllers/messgeController");

router.get("/all/:id", MessageController.allMessage)
router.post("/add", MessageController.newMessage)

module.exports = router;


