// 몽고DB 연결

const mongoose = require('mongoose');
const connect = () => {
  mongoose.connect("mongodb://localhost/board3", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
};

module.exports = connect;
