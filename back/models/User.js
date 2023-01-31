const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const host = "http://localhost";
const port = "3030"

const Userschema = new Schema(
  {
    name: { type: String, required: true, min: 6, max: 255 },
    email: { type: String, required: true, min: 6, max: 1024 },
    password: { type: String, required: true, minlength: 6 },
    age: { type: String, default:"empty" },
    rol: { type: String, default:"mentee" },
    status: { type: String, required: true, default:"unverified" },
    wildcard: { type: String, required: true, default:"wildcard" },
    image: { type: String },
    notification: { type: [Object], default:[] },
    match: { type: [Object], default:[]},
    date: { type: Date, default: Date.now() },
  }, 
);

Userschema.methods.setImgUrl = function setImgUrl (filename){
 this.image = `${host}:${port}/public/${filename}`
}

Userschema.plugin(mongoosePaginate);
const User = mongoose.model("User", Userschema);
module.exports = User;


