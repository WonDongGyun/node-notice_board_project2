const express = require('express');
const { Account, Board, Comment } = require('../../models')
const router = express.Router();
const authMWRouter = require('../../authentication/auth_login');


// 게시글 작성
router.post('/writeBoard', authMWRouter, async (req, res) => {
    try {
        const { title, contents } = req.body;
        const { account } = res.locals;
        const nickname = account['dataValues']['nickname'];

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

        await Board.create({ boardId, nickname, title, contents, day });

        res.status(200).send({
            result: "success",
            status: 200,
            modal_title: "저장 성공",
            modal_body: "글이 성공적으로 저장 되었습니다."
        });
    } catch (err) {
        res.status(400).send({
            result: "fail",
            status: 400,
            modal_title: "저장 실패",
            modal_body: "내용 확인 후, 다시 작성해주세요."
        });
    }
})

// readBoard에서 수정하기 혹은 삭제하기 
router.post('/chkPW', authMWRouter, async (req, res) => {
    try {
        const { boardId, passWord, nowButton } = req.body;
        const { account } = res.locals;
        const nickname = account['dataValues']['nickname'];

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
                res.status(200).send({
                    result: "success",
                    status: 200
                });
            } else {

                await Comment.destroy({
                    where: {
                        boardId
                    }
                });

                await Board.destroy({
                    where: {
                        boardId
                    }
                });

                res.status(200).send({
                    result: "success",
                    status: 200,
                    modal_title: "삭제 성공",
                    modal_body: "글이 성공적으로 삭제 되었습니다."
                });
            }
        } else {
            res.status(400).send({
                result: "fail",
                status: 400,
                modal_title: "확인 필요",
                modal_body: "비밀번호를 확인해주세요."
            });
        }
    } catch (err) {
        res.status(400).send({
            result: "fail",
            status: 400,
            modal_title: "확인 필요",
            modal_body: "비밀번호를 확인해주세요."
        });
    }
})




// readBoard에서 댓글 수정하기 혹은 삭제하기 비밀번호 검증
router.post('/chkCommentPW', authMWRouter, async (req, res) => {
    try {
        const { commentId, boardId, passWord, nowButton } = req.body;
        const { account } = res.locals;
        const nickname = account['dataValues']['nickname'];

        Account.hasMany(Comment, { foreignKey: 'nickname' });
        Comment.belongsTo(Account, { foreignKey: 'nickname' });

        const findIdPw = await Comment.findOne({
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
                commentId, boardId
            }
        });

        if (findIdPw != null) {
            if (nowButton == 'updComment') {
                res.status(200).send({
                    result: "success",
                    status: 200
                });
            } else {

                res.status(200).send({
                    result: "success",
                    status: 200
                });
            }
        } else {
            res.status(400).send({
                result: "fail",
                status: 400,
                modal_title: "확인 필요",
                modal_body: "작성자와 비밀번호를 확인해주세요."
            });
        }
    } catch (err) {
        res.status(400).send({
            result: "fail",
            status: 400,
            modal_title: "확인 필요",
            modal_body: "작성자와 비밀번호를 확인해주세요."
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


        if (findIdPw != null) {
            if (nowButton == 'updateButton') {
                await Board.update(
                    {
                        title: title,
                        contents: contents
                    },
                    {
                        where: {
                            boardId
                        }
                    },
                );

                res.status(200).send({
                    result: "success",
                    status: 200,
                    modal_title: "수정 성공",
                    modal_body: "글이 성공적으로 수정 되었습니다."
                });

            } else {
                await Comment.destroy({
                    where: {
                        boardId
                    }
                });

                await Board.destroy({
                    where: {
                        boardId
                    }
                });

                res.status(200).send({
                    result: "success",
                    status: 200,
                    modal_title: "삭제 성공",
                    modal_body: "글이 성공적으로 삭제 되었습니다."
                });
            }
        }
    } catch (err) {
        res.status(400).send({
            result: "fail",
            status: 400,
            modal_title: "삭제 실패",
            modal_body: "제목 혹은 내용을 확인해주세요."
        });
    }
})


router.post('/writeComment', authMWRouter, async (req, res) => {
    try {
        const { boardId, comment } = req.body;
        const { account } = res.locals;
        const nickname = account['dataValues']['nickname'];

        const findIdPw = await Account.findOne({
            where: {
                nickname
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

            res.status(200).send({
                result: "success",
                status: 200,
                modal_title: "댓글 성공",
                modal_body: "댓글을 입력했습니다."
            });

        } else {
            res.status(400).send({
                result: "fail",
                status: 400,
                modal_title: "댓글 실패",
                modal_body: "댓글을 다시 입력해주세요."
            });
        }



    } catch (err) {
        res.status(400).send({
            result: "fail",
            status: 400,
            modal_title: "댓글 실패",
            modal_body: "댓글을 다시 입력해주세요."
        });
    }
})



// 댓글 수정기능
router.post('/chgComment', authMWRouter, async (req, res) => {
    try {
        const { commentId, boardId, comment } = req.body;
        const { account } = res.locals;
        const nickname = account['dataValues']['nickname'];

        const findIdPw = await Comment.findOne({
            where: {
                commentId, boardId, nickname
            }
        });

        const today = new Date();
        const utc = today.getTime() + (today.getTimezoneOffset() * 60 * 1000);
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

        const kr_today = new Date(utc + KR_TIME_DIFF + 32400000);
        const commentDay = kr_today;

        if (findIdPw != null) {
            await Comment.update(
                {
                    comment: comment
                },
                {
                    where: {
                        commentId
                    }
                },
            );

            res.status(200).send({
                result: "success",
                status: 200,
                modal_title: "수정 성공",
                modal_body: "글이 성공적으로 수정 되었습니다."
            });
        } else {
            res.status(400).send({
                result: "fail",
                status: 400,
                modal_title: "수정 실패",
                modal_body: "댓글 수정에 실패했습니다."
            });
        }
    } catch (err) {
        res.status(400).send({
            result: "fail",
            status: 400,
            modal_title: "수정 실패",
            modal_body: "댓글 수정에 실패했습니다."
        });
    }
})






router.post('/delComment', authMWRouter, async (req, res) => {
    try {
        const { commentId, boardId } = req.body;
        const { account } = res.locals;
        const nickname = account['dataValues']['nickname'];

        await Comment.destroy({
            where: {
                commentId, boardId, nickname
            }
        });

        res.status(200).send({
            result: "success",
            status: 200,
            modal_title: "삭제 성공",
            modal_body: "글이 성공적으로 삭제 되었습니다."
        });

    } catch (err) {
        res.status(400).send({
            result: "fail",
            status: 400,
            modal_title: "삭제 실패",
            modal_body: "작성자와 비밀번호를 확인해주세요."
        });
    }
})


module.exports = router;