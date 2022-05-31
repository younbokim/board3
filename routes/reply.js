// 회원 가입 관련 API 작성하기

const express = require('express');
const Reply = require('../schemas/reply');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const authMiddleware = require('../middlewares/auth-Middleware');
const router = express.Router();

// 댓글 작성 api
router.post('/replys', async (req, res) => {
    // const { postId } = req.params;
    const { postId, nickname, comment } = req.body;

    if (!req.headers.authorization) {
        res.status(400).send({
            ereorMessage: '로그인이 필요한 기능입니다.',
        });
        return;
    
    } else {
        if (comment === '') {
            res.status(400).send({
                ereorMessage: '댓글 내용을 입력해 주세요',
            });
            return;
        }

        const maxcommentsId = await Reply.findOne().sort('-commentsId').exec();
        let commentsId = 1;

        if (maxcommentsId) {
            commentsId = new Number(maxcommentsId.commentsId) + 1;
        } 
        
        console.log(commentsId);

        const creatComments = await Reply.create({ postId, nickname, comment, commentsId });
        res.send({ comment: creatComments });
    }
});
// 댓글 수정 api
router.put('/replys', authMiddleware, async (req, res) => {
    const { nickname } = res.locals.user;
    const { postId, commentsID, comment } = req.body;

    const comments = await Reply.findOne({ commentsId: Number(commentsID) });

    if (!comments) {
        return res.status(400).json({ success: false, ereorMessage: '존재 하지 않는 댓글' });
    } else if (comments['nickname'] !== nickname) {
        return res.status(400).send({ ereorMessage: '사용자가 쓴 댓글이 아닙니다.' });
    }
    await Reply.updateOne({ commentsId: Number(commentsID) }, { $set: { comment } });
    res.json({ success: true });
});

// 댓글 삭제 api
router.delete('/replys', authMiddleware, async (req, res) => {
    const { nickname } = res.locals.user;
    const { postId, commentsID, comment } = req.body;


    const comments = await Reply.findOne({ commentsId: Number(commentsID) });
    if (!comments) {
        return res.status(400).json({ success: false, ereorMessage: '존재 하지 않는 댓글' });
    } else if (comments['nickname'] !== nickname) {
        return res.status(400).send({ ereorMessage: '사용자가 쓴 댓글이 아닙니다.' });
    }

    await Reply.deleteOne({ commentsID });
    res.send({ success: true });
});

module.exports = router;