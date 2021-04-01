const express = require('express');
const app = express();
const port = 3000;
module.exports = app;

const { Account, Board, Comment } = require('./models')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const basicBoardRouter = require('./views/basicBoard/basicBoard');
app.use('/api', basicBoardRouter)

const accountRouter = require('./views/account/account');
app.use('/accountAPI', accountRouter)

const authMWRouter = require('./authentication/auth_login');


// 계정 관련 
// 로그인
app.get('/login', (req, res) => {
    res.render('./account/login');
})

// 회원가입
app.get('/signUp', (req, res) => {
    res.render('./account/signUp');
})




// 게시판 관련
// 전체 게시글 목록 조회 페이지
app.get('/', async (req, res) => {
    const boards = await Board.findAll({
        order: [['day', 'DESC']]
    })

    res.render('./basicBoard/basicBoard', { boards: boards });
})

// 게시글 조회 페이지
// 읽어야 할 게시물을 조회
app.get('/readBoard', async (req, res) => {
    let boardId = req.query.boardId;
    try {
        const read = await Board.findOne({
            where: {
                boardId
            }
        });

        const comment = await Comment.findAll({
            where: {
                boardId
            },
            order: [['commentDay', 'DESC']]
        });

        res.render('./basicBoard/readBoard', {
            boardId,
            readBoard: read,
            commentBoard: comment
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
})

// 게시글 작성 페이지
app.get('/auth/writeBoard', authMWRouter, async (req, res) => {
    res.status(200).send({
        result: "success",
        status: 200,
    });
})
app.get('/writeBoard', async (req, res) => {
    res.render('./basicBoard/writeBoard');
})


// 게시글 수정 페이지
app.get('/updateBoard', async (req, res) => {
    let boardId = req.query.boardId;

    try {
        const read = await Board.findOne({
            where: {
                boardId
            }
        });

        res.render('./basicBoard/updateBoard', {
            boardId,
            readBoard: read,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
})


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})