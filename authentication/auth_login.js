const jwt = require("jsonwebtoken");
const { Account } = require("../models");

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(" ");

    if (tokenType != "Bearer") {
      return res.status(400).send({
        result: "fail",
        status: 400,
        modal_title: "로그인 필요",
        modal_body: "로그인을 해주세요.",
      });
    }

    const { nickname } = jwt.verify(tokenValue, "DongGyunKey");

    Account.findByPk(nickname).then((account) => {
      res.locals.account = account;
      next();
    });
  } catch (err) {
    res.status(400).send({
      result: "fail",
      status: 400,
      modal_title: "로그인 필요",
      modal_body: "로그인을 해주세요.",
    });
  }
};
