const MessageService = require("../services/messageService");



class MessageControler {

    static async newMessage(req, res) {

      const { error, data } = await MessageService.newMessage(req.body);
      
      if (error) {
      return res.status(400).send(data);
      }
      res.status(201).send(data);
    }

    static async allMessage(req, res) {

      const { error, data } = await MessageService.allMessage(req.params.id);
      if (error) {
      return res.status(400).send(data);
      }
      res.status(201).send(data);
    }
  }

module.exports = MessageControler;
