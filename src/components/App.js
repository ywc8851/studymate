import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "components/fbase";

function App() {
  // react hook 사용
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    // firebase가 초기화 하는 걸 기다려줌
    authService.onAuthStateChanged((user) => {
      // 로그인 되어있는지 아닌지를 알 수 있음
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true); // init이 false면 router를 숨김
    });
  }, []);
  // 로그인한 정보가 currentuser에 들어감
  return (
    <>
      <header>공부 메이트</header>

      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>
        &copy; {new Date().getFullYear()} 공부메이트 copyright by 조용우
      </footer>
    </>
  );
}

export default App;
