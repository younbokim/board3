const express = require('express');
const Board = require('../schemas/board');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const authMiddleware = require('../middlewares/auth-Middleware');
const router = express.Router();


// 게시글 전체 조회 API

router.get('/boards', async ( req, res ) => {
  const boards = await Board.find({}, {_id: 0, context : 0});

  res.json({
    boards: boards.sort((a, b) => b["uploadDate"] - a["uploadDate"])
  });

});

// 게시글 작성 API

router.post("/boards", async (req, res) => {
  const { boardTitle, nickname, context } = req.body; // post로 전달되는 데이터들을 각각 변수로 저장
  
  const maxPostsId = await Board.findOne().sort('-postId').exec();
  let postId = 1;

  if (maxPostsId) {
    postId = new Number(maxPostsId.postId) + 1;
  }

  const creatBoard = await Board.create({ nickname, boardTitle, context, postId });
  res.send({ board: creatBoard });
});


// 게시글 조회 및 댓글 조회 API




module.exports = router;