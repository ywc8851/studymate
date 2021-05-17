import React from "react";
import Bulletin from "./Bulletin";
const Posts = ({ boards, userObj }) => {
  return (
    <>
      <div>
        {/* 모든게시글을 보여줌 */}
        {boards.map((board) => (
          <>
            <Bulletin
              key={board.id}
              BulletinObj={board}
              isOwner={board.creatorId === userObj.uid} // 계정사용자가 게시글 사용자인지 확인하기위해
            />

            <br></br>
          </>
        ))}
      </div>
    </>
  );
};
export default Posts;
