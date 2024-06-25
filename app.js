const express = require("express"); //웹 서버를 구축하기 위해 사용되는 Node.js 프레임워크
const mongoose = require("mongoose"); //MongoDB와 상호 작용하기 위해 사용되는 라이브러리
require("dotenv").config(); //환경 변수를 로드하기 위해 사용 (.env 파일에 정의된 변수들을 process.env로 접근할 수 있도록)
const cors = require("cors"); //다른 도메인에서 서버에 요청을 할 수 있도록 허용

const app = express(); //Express 어플리케이션 생성
app.use(cors()); //모든 경로에 대해 CORS 활성화

mongoose //.env 파일에 정의된 데이터베이스 URI 참조해서, MongoDB 데이터베이스에 연결
  .connect(process.env.DB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"));

module.exports = app; //app 객체를 다른 파일에서 사용할 수 있도록 내보냄
