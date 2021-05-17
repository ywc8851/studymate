import React, { useState, useEffect } from "react";
import { dbService } from "components/fbase";
import Bulletin from "../components/Bulletin";

const Myboard = ({ userObj }) => {
  const [myboards, setMyboards] = useState([]);

  useEffect(() => {
    // 실시간으로 게시글을 작성하면 바로 보여지게끔 onSnapshot 사용
    // onSnapshot은 "dbboard"의 db에 무슨일이 있을 때(수정,삭제,등록) , 알림을 받음
    // orderBy로 글작성 날짜기준 내림차순으로 정렬하여 보여주기
    dbService
      .collection("dbboard")
      .where("creatorId", "==", userObj.uid) // 내가작성한 게시글만
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const myboardArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyboards(myboardArray);
      });
  }, []);

  return (
    <div>
      {myboards.map((myboard) => (
        <Bulletin
          key={myboard.id}
          BulletinObj={myboard}
          isOwner={myboard.creatorId === userObj.uid} // 계정사용자가 게시글 사용자인지 확인하기위해
        />
      ))}
    </div>
  );
};
export default Myboard;
