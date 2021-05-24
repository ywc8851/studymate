import React, { useState } from "react";
import { authService, dbService } from "components/fbase";
import { useHistory, Link } from "react-router-dom";

const EditProfile = ({ refreshUser, userObj }) => {
  const history = useHistory();
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
    authService.signOut();
    history.push("/");
  };

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

        <select value={major} onChange={onChangeMajor}>
          <option value="">전공계열선택</option>
          <option value="인문계열">인문계열</option>
          <option value="사회계열(경상계열)">사회계열(경상계열)</option>
          <option value="사회계열(법학계열)">사회계열(법학계열)</option>
          <option value="사회계열(사회과학계열)">사회계열(사회과학계열)</option>
          <option value="공학계열">공학계열</option>
          <option value="자연계열">자연계열</option>
          <option value="교육계열">교육계열</option>
          <option value="의약계열(의학)">의약계열(의학)</option>
          <option value="의약계열(간호,치료보건)">
            의약계열(간호,치료보건)
          </option>
          <option value="예체능계열">예체능계열</option>
        </select>
        <br></br>
        <input type="submit" value="프로필 변경하기" />
      </form>
    </>
  );
};
export default EditProfile;
