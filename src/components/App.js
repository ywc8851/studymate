import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService, dbService, storageService } from "components/fbase";

function App() {
  // react hook 사용 , 2개의 state
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    // firebase가 초기화 하는 걸 기다려줌
    authService.onAuthStateChanged((user) => {
      // 로그인 되어있는지 아닌지를 알 수 있음
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          major: "",
          updateProfile: (args) => user.updateProfile(args),
        });
      }
      setInit(true); // init이 false면 router를 숨김
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      major: "",
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  // 로그인한 정보가 currentuser에 들어감
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
