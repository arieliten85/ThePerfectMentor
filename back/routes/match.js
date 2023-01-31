const router = require("express").Router();

const MatchController = require("../controllers/matchController");

router.post("/new", MatchController.newMatch)
router.post("/update", MatchController.updateMatch)

module.exports = router;


