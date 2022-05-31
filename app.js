const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 8000;

connect();

const userRouter = require("./routes/user");
const boardRouter = require("./routes/board");
const replyRouter = require("./routes/reply");


app.use(express.urlencoded());
app.use(express.json());

app.use("/api", [userRouter, boardRouter, replyRouter]);

app.get('/', ( req, res ) => {
    res.send("접속완료");
});

app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌습니다.")
});



