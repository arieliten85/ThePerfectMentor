const router = require("express").Router();
const NotificationController = require("../controllers/notificationController");

router.post("/new", NotificationController.newNotification)

module.exports = router;


