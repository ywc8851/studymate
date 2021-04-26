import React from "react";
import { Link } from "react-router-dom";

// 메뉴 화면을 나타내는 네비게이션 바

const Navigation = ({ userObj }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">홈</Link>
      </li>
      <li>
        <Link to="/">추천리스트</Link>
      </li>
      <li>
        <Link to="/board">게시판</Link>
      </li>
      <li>
        <Link to="/profile">{userObj.displayName}의 프로필</Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
