const { ObjectId } = require("mongodb");
const Notification = require("../models/Notification");
const User = require("../models/User");


class NotificationServices {

  static async newNotification(body) {
 
    const {idDest,Rte }=body
    try {
      // Me fijo si en el array de noti del user estoy
      const userFind  = await User.find( { "_id" : ObjectId(idDest) }) 
      const matchNotification = userFind[0].notification.map(item =>  item.idRte === Rte.idRte ) 

      // Si no existo lo creo
      if  ( ( matchNotification.includes(true) )  === false ||  matchNotification.length === 0){
        const newNotification =  await Notification.create({...Rte});
        const userNotificated = await  User.findOneAndUpdate(
        { _id: ObjectId(idDest) }, 
        { $push: { notification: newNotification } },
      )

       return { error: false, data: userNotificated };
      }



      else{
      console.log("Ya se envió solicitud")
      return { error: false, data: "Ya se envió solicitud" }
      }
      
    }

    catch (error) {
     return { error: true, data: error };
    }
  }
}

module.exports = NotificationServices;
