const { ObjectId } = require("mongodb");
const Match = require("../models/Match");
const User = require("../models/User");




class MatchServices {

   static async newMatch(body) {


   try {

      if(!body.choice){

         await  User.findOneAndUpdate(
            { _id : ObjectId(body.id_user_log) },
            { $pull : { "notification": { "_id": ObjectId(body.id_alert) } } } );

         return { error: false, data: false };
      }

      else{

      // busco y armo el   de la notificacion user 
      const user_notification = await User.findOne({_id:body.id_notification});

      const user_notification_newObjet = {
         id: user_notification._id,
         name: user_notification.name,
         email: user_notification.email,
         rol: user_notification.rol,
         status: body.choice
      }

      /// creo el objeto match con el usuario de la notificacion
      const new_match_objet_user_noti =  await Match.create({...user_notification_newObjet}); // objeto de carlos


      /// le agrego el objeto match al usuario logeado
         await  User.findOneAndUpdate(
            { _id: ObjectId(body.id_user_log) }, 
            { $push: { match: new_match_objet_user_noti } },
         )

      const user_log = await User.findOne({_id:body.id_user_log});

         const user_log_newObjet = {
            id: user_log._id,
            name: user_log.name,
            email: user_log.email,
            rol: user_log.rol,
            status: body.choice
         }

      const new_match_objet_user_log =  await Match.create({...user_log_newObjet});

         await  User.findOneAndUpdate(
         { _id: ObjectId(body.id_notification) }, 
         { $push: { match: new_match_objet_user_log } },
         )
         // ELIMINO LAS NOTIFICACIONES DEL QUE MANDO LA PRIMERA NOTIFICACION

            await  User.findOneAndUpdate(
         { _id : ObjectId(body.id_user_log) },
         { $pull : { "notification": { "_id": ObjectId(body.id_alert) } } } );

          return { error: false, data: true };       
      }
   }



      catch (error) {
         console.log(error);
         return { error: true, data: error };
      }

   }
   static async updateMatch(body) {
      
      await User.updateOne(
      {"match._id" :ObjectId( body.idMatch) },
      {$set : {"match.$.status" : body.status}}
      );
      return { error: false, data: "Update Match" };
   }  
}

module.exports = MatchServices;
