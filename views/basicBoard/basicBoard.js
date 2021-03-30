const express = require('express');
const { Account, Board, Comment } = require('../../models')
const router = express.Router();
const authMWRouter = require('../../authentication/auth_login');


// 게시글 작성
router.post('/writeBoard', async (req, res) => {
    try {
        const { nickname, title, contents } = req.body;

        let boardId = await Board.findAll({
            order: [['boardId', 'DESC']],
            limit: 1
        });

        if (boardId.length == 0) {
            boardId = 1
        } else {
            boardId = boardId[0]['boardId'] + 1;
        }

        const today = new Date();
        const utc = today.getTime() + (today.getTimezoneOffset() * 60 * 1000);
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

        const kr_today = new Date(utc + KR_TIME_DIFF + 32400000);
        const day = kr_today;

        console.log(boardId, nickname, title, contents, day)

        await Board.create({ boardId, nickname, title, contents, day });

        console.log(boardId, nickname, title, contents, day)

        res.status(201).send({
            result: "success",
            modal_title: "저장 성공",
            modal_body: "글이 성공적으로 저장 되었습니다."
        });
    } catch (err) {
        res.status(400).send({
            result: "fail",
            modal_title: "저장 실패",
            modal_body: "내용 확인 후, 다시 작성해주세요."
        });
    }
})

// readBoard에서 수정하기 혹은 삭제하기 
router.post('/chkPassWord', async (req, res) => {
    try {
        const { boardId, nickname, passWord, nowButton } = req.body;

        Account.hasMany(Board, { foreignKey: 'nickname' });
        Board.belongsTo(Account, { foreignKey: 'nickname' });

        const findIdPw = await Board.findOne({
            include: [
                {
                    model: Account,
                    required: true,
                    where: {
                        nickname, passWord
                    }
                }
            ],
            where: {
                boardId
            }
        });


        if (findIdPw != null) {
            if (nowButton == 'updateButton') {
                res.send({ result: "success" });
            } else {
                await Board.deleteOne({
                    where: {
                        boardId
                    }
                });
                res.status(201).send({
                    result: "success",
                    modal_title: "삭제 성공",
                    modal_body: "글이 성공적으로 삭제 되었습니다."
                });
            }
        } else {
            res.status(400).send({
                result: "fail",
                modal_title: "삭제 실패",
                modal_body: "비밀번호를 확인해주세요."
            });
        }
    } catch (err) {
        res.status(400).send({
            result: "fail",
            modal_title: "삭제 실패",
            modal_body: "비밀번호를 확인해주세요."
        });
    }
})


// updateBoard에서 수정하기 혹은 삭제하기 
router.post('/updateBoard', async (req, res) => {
    try {
        const { boardId, title, contents, nowButton } = req.body;
        const findIdPw = await Board.findOne({
            where: {
                boardId
            }
        });

        const today = new Date();
        const utc = today.getTime() + (today.getTimezoneOffset() * 60 * 1000);
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

        const kr_today = new Date(utc + KR_TIME_DIFF + 32400000);
        const day = kr_today;

        if (findIdPw != null) {
            if (nowButton == 'updateButton') {
                await Board.update(
                    {
                        title: title,
                        contents: contents,
                        day: day
                    },
                    {
                        where: {
                            boardId
                        }
                    },
                );

                res.send({
                    result: "success",
                    modal_title: "수정 성공",
                    modal_body: "글이 성공적으로 수정 되었습니다."
                });

            } else {

                await board.deleteOne({ boardId });
                res.send({
                    result: "success",
                    modal_title: "삭제 성공",
                    modal_body: "글이 성공적으로 삭제 되었습니다."
                });
            }
        }
    } catch (err) {
        res.send({
            result: "fail",
            modal_title: "삭제 실패",
            modal_body: "제목 혹은 내용을 확인해주세요."
        });
    }
})


router.post('/writeComment', async (req, res) => {
    try {
        const { boardId, nickname, comment } = req.body;

        Account.hasMany(Board, { foreignKey: 'nickname' });
        Board.belongsTo(Account, { foreignKey: 'nickname' });

        const findIdPw = await Board.findOne({
            include: [
                {
                    model: Account,
                    required: true,
                    where: {
                        nickname
                    }
                }
            ],
            where: {
                boardId
            }
        });


        if (findIdPw != null) {
            let commentId = await Comment.findAll({
                order: [['commentId', 'DESC']],
                limit: 1
            });

            if (commentId.length == 0) {
                commentId = 1
            } else {
                commentId = commentId[0]['commentId'] + 1;
            }

            const today = new Date();
            const utc = today.getTime() + (today.getTimezoneOffset() * 60 * 1000);
            const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

            const kr_today = new Date(utc + KR_TIME_DIFF + 32400000);
            const commentDay = kr_today;


            await Comment.create({ commentId, boardId, nickname, comment, commentDay })

            res.send({
                result: "success",
                modal_title: "댓글 성공",
                modal_body: "댓글을 입력했습니다."
            });

        } else {
            res.send({
                result: "fail",
                modal_title: "댓글 실패",
                modal_body: "댓글을 다시 입력해주세요."
            });
        }



    } catch (err) {
        res.send({
            result: "fail",
            modal_title: "댓글 실패",
            modal_body: "댓글을 다시 입력해주세요."
        });
    }
})


module.exports = router;