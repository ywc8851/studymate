import React from "react";
import { authService } from "components/fbase";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();
  {
    /*로그아웃한 후 홈화면으로 돌아가게 하는 함수*/
  }
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
