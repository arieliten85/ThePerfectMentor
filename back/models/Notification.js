const mongoose = require("mongoose");
const { Schema } = mongoose;


const Notificationschema = new Schema(
  {
    idRte: { type: String },
    nameRte: { type: String },
    rolRte: { type: String },
    timestamps: { type: Date, default: Date.now },
  },
);



const Notification = mongoose.model("Notification", Notificationschema);

module.exports = Notification;


