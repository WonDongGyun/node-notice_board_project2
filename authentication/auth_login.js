const jwt = require('jsonwebtoken');
const { Account } = require('../models');

module.exports = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        console.log(3)
        const [tokenType, tokenValue] = authorization.split(' ');


        if (tokenType != 'Bearer') {
            return res.status(400).send({
                result: "fail",
                modal_title: "로그인 필요",
                modal_body: "로그인을 해주세요."
            });

        }

        const { nickname } = jwt.verify(tokenValue, 'DongGyunKey');

        console.log(4)
        Account.findByPk(nickname).then((account) => {
            res.locals.account = account;
        });
        next();
        console.log(5)
    } catch (err) {
        res.status(400).send({
            result: "fail",
            modal_title: "로그인 필요",
            modal_body: "로그인을 해주세요."
        });

    }
}