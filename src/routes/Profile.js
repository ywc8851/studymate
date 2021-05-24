import React, { useState } from "react";
import { authService, dbService } from "components/fbase";
import { useHistory, Link } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
  const history = useHistory();

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <Link to={"/editprofile"}>
        <button>프로필 변경하기</button>
      </Link>
      <br></br>
      <Link to={"/myboard"}>
        <button> 내가 작성한 글 </button>
      </Link>
      <br></br>

      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};
