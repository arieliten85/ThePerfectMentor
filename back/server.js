const express = require("express");
const app = express();
const appRoutes = require("./routes");
const volleyball = require("volleyball");

require("dotenv").config();
//require("./config/db");

const db = require("./config/db");

const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}


app.use(cors(corsOptions));
app.use(express.static("./public"))
app.use(express.json());
app.use(volleyball);
app.use("/api", appRoutes);

// app.get("/task", (req, res) => {
//   res.json({ message: "Welcome to Blog API!" });
// });
app.use("/public",express.static(`${__dirname}/uploads`))



const PORT = process.env.PORT;
const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = servidor


// SOCKET.IO CONFIG

const {Server} = require("socket.io");

const io = new Server(servidor,{
  pingTimeout:60000,
  cors:{
    origin: process.env.FRONT_URL,
  },
})



let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};


const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUsers = (userId) =>{
  return users.find((user)=>user.userId === userId);
}

//Listen Conecction
io.on("connection",(socket)=>{

  console.log("Conectado a socket.io")

  // Cuando se conecta
  socket.on("addUser", (userId)=>{
    console.log("Un nuevo usuario CONECTADO! ")

    
    addUser(userId, socket.id)
    io.emit("getUsers",users)
  })

  // enviar y recibir un mensaje

  socket.on("sendMessage", ({senderId, receiverId, text, senderName, receiverName })=>{

    console.log(senderName, receiverName)
    
    const user = getUsers(receiverId);
    io.to(user?.socketId).emit("getMessage",{
      senderId,
      text,
      senderName,
      receiverName
    })
    console.log("Mensaje enviado")
  })

  // Cuando se desconecta
  socket.on("disconnect",()=>{
    console.log("Usuario DESCONECTADO! ")
    removeUser(socket.id);
    io.emit("getUsers",users);

  })
})


