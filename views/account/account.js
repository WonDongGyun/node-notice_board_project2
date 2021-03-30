const express = require('express');
const joi = require('joi')
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { Account } = require('../../models');
const router = express.Router();


const chkAccountSchema = joi.object({
    nickname: joi.string()
        .alphanum()
        .min(3)
        .required(),
    password: joi.string()
        .min(4)
        .required()
})


router.post('/signUp', async (req, res) => {
    try {
        const { nickname, password } = await chkAccountSchema.validateAsync(req.body);

        if (password.indexOf(nickname) != -1) {
            res.status(400).send({
                result: "fail",
                modal_title: "회원가입 실패",
                modal_body: "양식에 맞지 않습니다."
            });
            return;
        }

        const user = await Account.findAll({
            where: { nickname }
        })

        if (user.length > 0) {
            res.status(400).send({
                result: "fail",
                modal_title: "회원가입 실패",
                modal_body: "이미 존재하는 닉네임입니다."
            });

        } else {
            await Account.create({ nickname, password });
            res.status(201).send({
                result: "success",
                modal_title: "회원가입 성공",
                modal_body: "회원이 되신것을 축하드립니다!"
            });
        }
    } catch (err) {
        res.status(400).send({
            result: "fail",
            modal_title: "회원가입 실패",
            modal_body: "양식에 맞지 않습니다."
        });
    }

})


router.post('/login', async (req, res) => {
    const { nickname, password } = req.body;

    const user = await Account.findOne({
        where: { nickname, password }
    })

    if (!user) {
        res.status(400).send({
            result: "fail",
            modal_title: "로그인 실패",
            modal_body: "아이디 혹은 비밀번호가 틀렸습니다."
        });

    } else {
        const token = jwt.sign({ nickname: user.nickname }, "DongGyunKey");

        res.status(201).send({
            token: token,
            result: "success",
            modal_title: "로그인 성공",
            modal_body: nickname + "님 환영합니다."
        });
    }


})


module.exports = router;