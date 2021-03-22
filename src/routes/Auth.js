import React, { useState } from "react";
import { authService } from "fbase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true); // newAccount인 경우로 설정
  const [error, setError] = useState("");
  const onChange = (event) => {
    // input에 입력한 값들을 저장
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      // name이 emial이면 state인 email을 변경
      setEmail(value);
    } else if (name === "password") {
      // name이 password면 password를 변경
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    /* 
    사용자가 form을 submit 할때마다
    그 event를 가져와서 preventDefalut 시킴
    preventDefault : 기본행위가 실행되는걸 방지
    */
    event.preventDefault();
    try {
      let data; // 데이터를 담을 변수
      if (newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(
          // 이메일과 비밀번호 입력받기
          email,
          password
        );
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      // 에러 발생시 에러 출력
      setError(error.message);
    }
  };
  // newAccount의 이전 값을 가져와서 그 값에 반대되는 것을 리턴
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email} // input의 value는 state에 저장
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password} // input의 value는 state에 저장
          onChange={onChange}
        />

        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
          // newAccount일때는 Create Account를 보여주고 아니면 Log In 보여줌
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {
          newAccount ? "Sign In" : "Create Account"
          // newAccount 일때는 Sign In을 보여주고
          // Sign In을 클릭하면 Create account로 변환
          // Create account 를 클릭하면 Sign In으로 변환
        }
      </span>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
