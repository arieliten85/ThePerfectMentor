
const Message = require("../models/Message");


class MessageService {

  static async newMessage(body) {

    const newMessage =  await Message.create({...body});

    try {
    return { error: false, data: newMessage };
    }

    catch (error) {
      console.log(error);
      return { error: true, data: error };
    }

  }

  static async allMessage(id) {

     try {
        const messages = await Message.findOne({chat_id:id});
      
        return { error: false, data: messages }
      }
       catch (err) {
        return { error: false, data: err }
      }

  }
}

module.exports = MessageService;
