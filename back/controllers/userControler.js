const UserServices = require("../services/userServices");
const jwt = require('jsonwebtoken');
const { getTemplate, sendEmail } = require("../utils/templeEmail/mail.config");

const getToken = require("../utils/middleware/getToken");
const User = require("../models/User");



class UserControler {

  static async allUsers(req, res) {

    const limit = parseInt(req.query.limit, 10) ||  5
    const page =  parseInt(req.query.page, 10)  ||  1
    const rol = req.query.rol
    let options = {}
    if(rol !== ''){  options = {rol}  }
    else {   options = { wildcard:"wildcard"}  }

    try {
      const users = await User.paginate( options,{limit , page})

    if(!users){
     return res.status(400).send("Page not found")
    }
     res.status(201).send(users);
    }
    catch (error) {
    return  res.status(404).send(error);
    }
  }

  static async allStadistics(req, res) {

    const { error, data } = await UserServices.allStadistics(req.body);

    if (error) res.status(400).send(data);

    res.status(201).send(data);
  }

  static async userLogin(req, res) {

  const { error, data } = await UserServices.userLogin(req.body);

    if (error) {
     return res.status(404).send(data);
    }

      // // create token
      const token = jwt.sign({
      id: data._id,
      name:  data.name,
      rol: data.rol,
      notification: data.notification,
      match: data.match
      }, process.env.TOKEN_SECRET)


      // // envio token al cliente
      res.header('auth-token', token).json({
      //error: false,
      user:  {
      id: data._id,
      name:  data.name,
      rol: data.rol,
      token:token
    }
  })

  // res.status(201).send(user);

  }

  static async userRegister(req, res) {

  const { error, data } = await UserServices.userRegister(req.body);

  if (error) {
  return res.status(400).send(data);
  }

    if(req.file){
      const {filename}=req.file
      data.setImgUrl(filename)
    }

    await data.save();

    // create token
    const token = jwt.sign({
      id: data._id,
      name:  data.name,
      rol: data.rol
    }, process.env.TOKEN_SECRET)

      //Envio correo al usuario registrado
      const template = getTemplate( data.name,token )
      await sendEmail(data.email,"Verificacion de correo", template)

      // envio token al cliente
      res.header('auth-token', token).json({
      //error: false,
      user:  {
      id: data._id,
      name:  data.name,
      rol: data.rol,
      image: data.image,
      token:token
      }
    })

  }

  static async confirmMail(req, res) {

    try{
      const {error , data } = await getToken(req.params.token)
      //Errot del token
      if (error) {
      return res.status(400).send(data);
      }
      //Busco User
      const user = await User.findById({ _id:data.id})

      //No existe Usuario
      if(user === null){
      return res.status(400).send("Usuario no existe");
      }
      user.status = "verified"
      await user.save()
      return res.redirect("/confirm.html")
    }

      catch(error){
      res.status(400).send(error);
    }
  }

  static async userEdit(req, res) {

    const { error, data } = await UserServices.userEdit( req.params.id, req.body);
    if (error) {
    return res.status(400).send(data);
    }
    res.status(201).send("usuario actualizado correctamete");
  }

  static async userDelete(req, res) {

  const { error, data } = await UserServices.userDelete(req.params.id);

    if (error) {
    return res.status(400).send(data);
    }
    res.status(201).send("Se elimino correctamente");
  }

  static async getOneUserName(req, res) {

    const { error, data } = await UserServices.getOneUserName(req.params.name);
    if (error) {
    return res.status(400).send(data);
    }
    res.status(201).send(data);
  }

  static async getOneUser(req, res) {
  const { error, data } = await UserServices.getOneUser(req.params.id);
  if (error) {
  return res.status(400).send(data);
  }
  res.status(201).send(data);
  }
}

module.exports = UserControler;
