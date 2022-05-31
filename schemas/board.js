// 게시글 서버 구성을 위한 데이터베이스 세팅
// 필요한 변수명: 글 제목(String), 닉네임(String), 작성일자(Date), 작성글(String)

// mongoose 모듈 임포트
const mongoose = require("mongoose");

// 스키마 함수를 활용해서 데이터베이스 형태를 세팅 (new를 통해서 클래스 생성)
const boardSchema = new mongoose.Schema({

// 게시글 제목
boardTitle: {
  type: String,
  required: true,
},

// 포스트 아이디
postId: {
  type: String,
  required: true,
  unique: true
},

// 닉네임
nickname: {
  type: String,
  required: true
},

// 작성일자
uploadDate: {
  type: Date,
  default: Date.now,
},

// 작성글
context: {
  type: String
}

});

// 스키마 데이터 Export
module.exports = mongoose.model("Board", boardSchema);