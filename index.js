const { createServer } = require("http"); //Node.js의 http 모듈에서 HTTP 서버를 생성하는 함수 가져옴
const app = require("./app"); //./app 파일에서 정의된 Express 어플리케이션 가져옴
const { Server } = require("socket.io"); //Socket.IO 서버를 생성하는 클래스
require("dotenv").config(); //환경 변수를 .env 파일에서 로드하여 process.env에 추가

const httpServer = createServer(app); //Express 어플리케이션 기반으로 HTTP 서버 생성

//httpServer 기반으로 Socket.IO 서버 생성
const io = new Server(httpServer, {
  //http://localhost:3000 도메인에서 오는 요청 허용
  cors: { origin: "http://localhost:3000" },
});

require("./utils/io")(io); //io를 매개변수로 전달
//HTTP 서버를 특정 포트에서 실행 - 포트 번호는 .env 파일에 정의된 PORT 환경 변수에서 가져옴
httpServer.listen(process.env.PORT, () => {
  console.log("server listening on port", process.env.PORT);
});
