const mongoose = require("mongoose");
const { Schema } = mongoose;


const Matchschema = new Schema(
  {
    id: { type: String },
    name: { type: String },
    email: { type: String }, 
    rol: { type: String },
    status: { type: Boolean, default: true }
  }
);

const Match = mongoose.model("Match", Matchschema);
module.exports = Match;


