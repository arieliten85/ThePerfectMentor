const User = require("../models/User");
const bcrypt = require("bcrypt");
const schemaRegister = require("../utils/validations/SchemaRegister");
const schemaLogin = require("../utils/validations/SchemaLogin");


class UserServices {

  static async allStadistics() {
    try {
      const users = await User.find();
      return { error: false, data: users };
    }

    catch (error) {
     return { error: true, data: error };
    }

  }

  static async getOneUser(id) {

    try {
      const users = await User.findOne({_id:id});
      return { error: false, data: users };
    }

    catch (error) {
      return { error: true, data: error };
    }

  }

  static async getOneUserName(name) {

    const users = await User.findOne( {name});
      try {
       return { error: false, data: users };
      }

      catch (error) {
       return { error: true, data: users };
    }
  }

  static async userLogin(body) {

    // Validacion de campos
    const { error } = schemaLogin.validate(body)

    if (error) return { error: true, data: error.details[0].message };

    // Usuario existente?
    const user = await User.findOne({ email: body.email });
    if (!user) return  { error: true, data: 'User not found' };

    // Comparacion de contraseña
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) return  { error: true, data:'Invalid password' };

    return  { data:user }

  }

  static async userRegister(body) {

      // Validacion de campos
      const { error } = schemaRegister.validate(body)
      if (error) return { error: true, data: error.details[0].message };

      // Email existente?
      const isEmailExist = await User.findOne({ email: body.email });
      if (isEmailExist)  return { error: true, data:  'Email already registered' };

      // hash contraseña
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(body.password, salt);

      // Creo el Usuario
      const user = new User({
      name: body.name,
      email: body.email,
      password: password,
      age: body.age,
      rol: body.rol,

      });

    try {

     return { error: false, data: user };
    }

    catch (error) {
      console.log(error);
      return { error: true, data: error };
    }

  }

  static async userEdit(id,body) {

    try{
    // Usuario existente?
      const userUpdate = await User.updateOne({_id:id},{...body});
      return { error: false, data: userUpdate };
    }

    catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }

  static async userDelete(id) {

    try{
    // Usuario existente?
      const userRemove = await User.findByIdAndRemove({_id:id});
      return { error: false, data: userRemove };
    }

    catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }
}

module.exports = UserServices;
