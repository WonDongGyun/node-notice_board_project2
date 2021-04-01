const express = require('express');
const joi = require('joi')
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { Account } = require('../../models');
const router = express.Router();


const chkAccountSchema = joi.object({
    nickname: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    password: joi.string()
        .min(4)
        .required(),
    chkPassword: joi.string()
        .min(4)
        .required()
})


router.post('/signUp', async (req, res) => {
    try {
        const { nickname, password, chkPassword } = await chkAccountSchema.validateAsync(req.body);
        const idReg2 = /^[a-zA-Z]+$/.test(nickname);
        const idReg3 = /^\d+$/.test(nickname);

        if (password != chkPassword) {
            return res.status(400).send({
                result: "fail",
                status: 400,
                modal_title: "회원가입 실패",
                modal_body: "비밀번호 확인은 비밀번호와 정확하게 일치해야 합니다."
            });
        }

        if (password.indexOf(nickname) != -1) {
            return res.status(400).send({
                result: "fail",
                status: 400,
                modal_title: "회원가입 실패",
                modal_body: "비밀번호는 최소 4자 이상이며, 비밀번호에 닉네임과 같은 값이 포함되면 안됩니다."
            });
        }

        if (idReg2 || idReg3) {
            return res.status(400).send({
                result: "fail",
                status: 400,
                modal_title: "회원가입 실패",
                modal_body: "닉네임은 최소 3자 이상이며, 알파벳 대소문자(a~z, A~Z) 및 숫자(0~9)의 혼합으로 이루어져야 합니다."
            });
        }


        const user = await Account.findOne({
            where: { nickname }
        })

        console.log(user)
        if (user != null) {
            res.status(400).send({
                result: "fail",
                status: 400,
                modal_title: "회원가입 실패",
                modal_body: "중복된 닉네임입니다."
            });

        } else {
            await Account.create({ nickname, password });
            res.status(200).send({
                result: "success",
                status: 200,
                modal_title: "회원가입 성공",
                modal_body: "회원이 되신것을 축하드립니다!"
            });
        }
    } catch (err) {
        res.status(400).send({
            result: "fail",
            status: 400,
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
            status: 400,
            modal_title: "로그인 실패",
            modal_body: "닉네임 또는 패스워드를 확인해주세요."
        });

    } else {
        const token = jwt.sign({ nickname: user.nickname }, "DongGyunKey");

        res.status(200).send({
            token: token,
            status: 200,
            result: "success",
            modal_title: "로그인 성공",
            modal_body: nickname + "님 환영합니다."
        });
    }


})


module.exports = router;