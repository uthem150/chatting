const Chat = require("../Models/chat"); // DB에 저장될 채팅 메시지의 스키마를 정의하는 Chat 모델 불러옴
const chatController = {};

//saveChat이라는 비동기 함수 chatController 객체에 추가
chatController.saveChat = async (message, user) => {
  //새로운 Chat 인스턴스 생성
  const newMessage = new Chat({
    chat: message,
    user: {
      id: user._id,
      name: user.name,
    },
  });
  //newMessage 인스턴스 데이터베이스에 저장
  await newMessage.save();
  return newMessage;
};

module.exports = chatController;
