const mongoose = require("mongoose");

// 회원가입을 위한 유저 DB 구성(닉네임과 비밀번호로 테이블 구성)
const UserSchema = new mongoose.Schema({
  nickname: String,
  password: String,
});

UserSchema.virtual('userId').get(function () {
  return this._id.toHexString();
});

UserSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model("User", UserSchema);
