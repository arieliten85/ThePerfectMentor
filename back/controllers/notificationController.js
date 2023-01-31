
const NotificationService = require("../services/notificationService");


class NotificationControler {

    static async newNotification(req, res) {

      const { error, data } = await NotificationService.newNotification(req.body);
      if (error) {
      return res.status(400).send(data);
      }
      res.status(201).send(data);
    }
  }

module.exports = NotificationControler;
