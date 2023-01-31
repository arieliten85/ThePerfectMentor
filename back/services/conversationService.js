const { ObjectId } = require("mongodb");
const Conversation = require("../models/Conversation");


class ConversationService {

  static async newConversation(body) {

    const {id, name, conversation }=body

    try {
      const newConversation =  await Conversation.create({
      id:id,
      name:name,
      });
      return { error: false, data: newConversation };
    }

    catch (error) {
      console.log(error);
      return { error: true, data: error };
    }

  }

    static async updateMatch(body) {

      try {
        await User.updateOne(

          {"match._id" :ObjectId( body.idMatch) },
          {$set : {"match.$.status" : body.status}}
    
            );
      return { error: false, data: "Update Match" };
      }

      catch (error) {
        console.log(error);
        return { error: true, data: "Error Update" };
      }
  }
}

module.exports = ConversationService;
