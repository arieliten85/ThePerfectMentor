const router = require("express").Router();


const ConversationController = require("../controllers/conversationController");


router.get("/all", ConversationController.allConversation)
router.post("/add", ConversationController.newConversation)


module.exports = router;


