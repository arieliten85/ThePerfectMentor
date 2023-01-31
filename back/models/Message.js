const mongoose = require("mongoose");
const { Schema } = mongoose;


const Messagechema = new Schema(
  {
   chat_id: { type: String },

   sender_id: { type: String },

   text: { type: String },

  },

  { timestamps: true }
 
);


const Message = mongoose.model("Message", Messagechema);
module.exports = Message;

