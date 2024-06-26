const User = require("../Models/user");
const userController = {}; //userController 객체 생성

userController.saveUser = async (userName, socketId) => {
  //이미 있는 유저인지 확인 - 데이터베이스에서 해당 이름을 가진 사용자가 있는지 검색하고, 결과를 user에 저장 (없으면 null)
  let user = await User.findOne({ name: userName });

  //없다면 새로 유저정보 만들기
  if (!user) {
    user = new User({
      name: userName,
      token: socketId,
      online: true,
    });
  }
  //이미 있는 유저라면 연결정보 token값 새로운 소켓 ID로 업데이트
  user.token = socketId;
  user.online = true;

  await user.save();
  return user;
};

userController.checkUser = async (socketId) => {
  const user = await User.findOne({ token: socketId }); //토큰이 socketId인 사람을 찾아라
  if (!user) throw new Error("user not found"); //유저가 없다고 에러
  return user; //유저정보 있으면, return
};

module.exports = userController;
