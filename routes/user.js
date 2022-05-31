// 회원 가입 관련 API 작성하기

const express = require('express');
const User = require('../schemas/user');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const authMiddleware = require('../middlewares/auth-Middleware');
const router = express.Router();

// 접속 테스트

router.get('/', ( req, res ) => {
    res.send("접속완료");
});


// 회원가입 구현 API

router.post("/users", async ( req, res ) => {
  
    console.log(req.body);
  
    // validation 절차 진행
    const postUserSchema = joi.object({
      nickname: joi.string().min(3).pattern(RegExp(/^[a-z|A-Z|0-9]+$/)).required(),
      password: joi.string().min(4).required(),
      confirmPassword: joi.string().min(4).required(),
    });
  
    try {
  
      const { nickname, password, confirmPassword } = 
        await postUserSchema.validateAsync(req.body);
      
      if (password !== confirmPassword) {
        res.status(400).send({errorMessage: "패스워드가 일치하지 않습니다."});
        return;
      }
  
      const existUsers = await User.find({ nickname });
      if (existUsers.length) {
        res
          .status(400)
          .send({ errorMessage: "중복된 닉네임입니다." });
        return;
      }
  
      const user = new User({ nickname, password});
      await user.save();
      res.status(201).send({});
  
    } catch (err) {
      console.log(err);
      res.status(400).send({ errorMessage: "요청한 형식이 올바르지 않습니다."});
    }
  });

// 로그인 인증 URL
router.post("/auth", async (req, res) => {
  const { nickname, password } = req.body;

  const user = await User.findOne({ nickname });

  // NOTE: 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses
  if (!user || password !== user.password) {
    res.status(400).send({
      errorMessage: "닉네임 또는 패스워드를 확인해주세요",
    });
    return;
  }

  res.send({
    token: jwt.sign({ userId: user.userId }, "customized-secret-key"),
  });
});

// 사용자 정보 가져오기

router.get('/user/me', authMiddleware, async ( req, res ) => {
  const { user } = res.locals;

  res.send ({
    user,
  });
});


module.exports = router;
