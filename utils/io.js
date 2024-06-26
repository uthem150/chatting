const chatController = require("../Controllers/chat.controller");
const userController = require("../Controllers/user.controller");

module.exports = function (io) {
  //클라이언트가 Socket.IO 서버에 연결될 때 실행되는 이벤트 리스너 정의
  //socket은 연결된 클라이언트를 나타내고, 각 클라이언트는 고유한 socket.id를 가짐
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    //클라이언트가 "login" 이벤트를 발생시킬 때 실행되는 리스너
    socket.on("login", async (userName, cb) => {
      try {
        //userController.saveUser 함수 호출하여, 사용자를 데이터베이스에 저장하거나 업데이트 (await 키워드 사용해서, 비동기 작업 완료될 때까지 기다림)
        const user = await userController.saveUser(userName, socket.id); //사용자 이름과 소켓 ID를 사용하여 사용자 정보를 저장하거나 업데이트
        const welcomeMessage = {
          chat: `${user.name} is joined to this room`,
          user: { id: null, name: "system" },
        };
        io.emit("message", welcomeMessage); //유저가 입장했음을 모두에게 알림
        cb({ ok: true, data: user });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    //sendMessage가 왔을 때, 함수 실행
    socket.on("sendMessage", async (message, cb) => {
      try {
        //socket id로 유저 찾기
        const user = await userController.checkUser(socket.id);
        //찾은 사용자 정보를 매개변수로 전달하여 메시지 저장
        const newMessage = await chatController.saveChat(message, user);

        //모든 클라이언트에게 저장된 새 메시지 브로드캐스트
        io.emit("message", newMessage);
        cb({ ok: true }); //콜백 함수 호출하여 클라이언트에게 작업이 성공적으로 완료되었음을 알림
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    //클라이언트가 연결을 끊을 때 실행되는 이벤트 리스너 정의
    socket.on("disconnect", () => {
      console.log("user is disconnected");
    });
  });
};
