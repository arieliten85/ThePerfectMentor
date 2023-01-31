const ConversationService = require("../services/conversationService");


class ConversationControler {

    static async newConversation(req, res) {

      const { error, data } = await ConversationService.newConversation(req.body);
      if (error) {
      return res.status(400).send(data);
      }
      res.status(201).send(data);
    }

    static async allConversation(req, res) {

      const { error, data } = await ConversationService.allConversation(req.body);
      if (error) {
      return res.status(400).send(data);
      }
      res.status(201).send(data);
    }
  }

module.exports = ConversationControler;
