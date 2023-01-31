const appRoutes = require("express").Router();


const user = require("./user");
const notification = require("./notification");
const match = require("./match");
const conversation = require("./conversation");
const message = require("./message");


appRoutes.use("/user", user);
appRoutes.use("/notification", notification);
appRoutes.use("/match", match);
appRoutes.use("/conversation", conversation);
appRoutes.use("/message", message);


module.exports = appRoutes;