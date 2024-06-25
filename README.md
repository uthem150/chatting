Backend : database setting, websocket setting
Frontend : websocket setting
Back - Front : user login
메시지 주고받기

라이브러리
express : 서버(nodejs 서버) (http서버에는 웹소켓을 올려놓고, express에는 database를 올려놓음)
mongoose : mongoDB를 DB로 사용하기 위해 도와주는 라이브러리
cors : frontend와 backend가 연결 통신하는데 문제 없도록 도와줌
dotenv : 내가 설치한 환경변수들 들고오는 라이브러리
http : http서버를 만들기 위한 라이브러리(http서버에는 웹소켓을 올려놓고, express에는 database를 올려놓음)
socket.io
