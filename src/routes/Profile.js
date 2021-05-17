import React, { useState } from "react";
import { authService, dbService } from "components/fbase";
import { useHistory, Link } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  {
    /*로그아웃한 후 홈화면으로 돌아가게 하는 함수*/
  }
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const [college, setCollege] = useState("");
  const [age, setAge] = useState("");
  const [major, setMajor] = useState("");
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  /* const getMyBulletins = async () => {
    // firebase 데이터베이스에서 원하는 정보만 추출하기
    // noSQL이기 때문에 index 필요함 , 그래야 querry 실행 가능
    const dbboard = await dbService
      .collection("dbboard")
      .where("creatorId", "==", userObj.uid) // 내가 작성한 게시글만 가져올 수 있도록 필터링
      .orderBy("createdAt")
      .get();
    console.log(dbboard.docs.map((doc) => doc.data()));
  }; */
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onChangeNickname = (event) => {
    const {
      target: { value },
    } = event;
    setNickname(value);
  };
  const onChangeAddress = (event) => {
    const {
      target: { value },
    } = event;
    setAddress(value);
  };
  const onChangeCollege = (event) => {
    const {
      target: { value },
    } = event;
    setCollege(value);
  };
  const onChangeAge = (event) => {
    const {
      target: { value },
    } = event;
    setAge(value);
  };
  const onChangeMajor = (event) => {
    const {
      target: { value },
    } = event;
    setMajor(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const profileObj = {
      name: nickname,
      profileId: userObj.uid,
      profileAddress: address,
      profileCollege: college,
      profileAge: age,
      profileMajor: major,
    };
    await dbService.collection("dbprofile").add(profileObj);
    setNickname("");
    setAddress("");
    setCollege("");
    setAge("");
    setMajor("");
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  /*  useEffect(() => {
    getMyBulletins();
  }, []); */

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="변경할 이름을 입력하세요"
          value={newDisplayName}
        />
        <br></br>
        <input
          onChange={onChangeNickname}
          type="text"
          placeholder="닉네임"
          value={nickname}
        />
        <br></br>
        <input
          onChange={onChangeAddress}
          type="text"
          placeholder="주소"
          value={address}
        />
        <br></br>
        <input
          onChange={onChangeCollege}
          type="text"
          placeholder="대학"
          value={college}
        />
        <br></br>
        <input
          onChange={onChangeAge}
          type="text"
          placeholder="나이"
          value={age}
        />
        <br></br>
        <input
          onChange={onChangeMajor}
          type="text"
          placeholder="전공"
          value={major}
        />
        <br></br>
        <input type="submit" value="프로필 변경하기" />
      </form>
      <Link to={"/myboard"}>
        <button> 내가 작성한 글 </button>
      </Link>
      <br></br>

      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};
