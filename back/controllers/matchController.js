const MatchService = require("../services/matchService");



class MatchControler {

    static async newMatch(req, res) {

      const { error, data } = await MatchService.newMatch(req.body);
      if (error) {
      return res.status(400).send(data);
      }
      res.status(201).send(data);
    }

    static async updateMatch(req, res) {

      const { error, data } = await MatchService.updateMatch(req.body);
      if (error) {
      return res.status(400).send(data);
      }
      res.status(201).send(data);
    }
  }

module.exports = MatchControler;
