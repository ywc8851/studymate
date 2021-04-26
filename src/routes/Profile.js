import React, { useEffect, useState } from "react";
import { authService, dbService } from "components/fbase";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  {
    /*로그아웃한 후 홈화면으로 돌아가게 하는 함수*/
  }
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyBulletins = async () => {
    // firebase 데이터베이스에서 원하는 정보만 추출하기
    // noSQL이기 때문에 index 필요함 , 그래야 querry 실행 가능
    const dbboard = await dbService
      .collection("dbboard")
      .where("creatorId", "==", userObj.uid) // 내가 작성한 게시글만 가져올 수 있도록 필터링
      .orderBy("createdAt")
      .get();
    console.log(dbboard.docs.map((doc) => doc.data()));
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  useEffect(() => {
    getMyBulletins();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="변경할 이름을 입력하세요"
          value={newDisplayName}
        />
        <input type="submit" value="프로필 변경하기" />
      </form>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};
