import React from "react";
import Bulletin from "./Bulletin";
const Posts = ({ boards, userObj }) => {
  return (
    <>
      <div>
        {/* ���Խñ��� ������ */}
        {boards.map((board) => (
          <>
            <Bulletin
              key={board.id}
              BulletinObj={board}
              isOwner={board.creatorId === userObj.uid} // ��������ڰ� �Խñ� ��������� Ȯ���ϱ�����
            />

            <br></br>
          </>
        ))}
      </div>
    </>
  );
};
export default Posts;
