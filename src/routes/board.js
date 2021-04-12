import React, { useState, useEffect } from "react";
import { dbService } from "components/fbase";
import Bulletin from "./Bulletin";

const Board = ({ userObj }) => {
  const [board, setBoard] = useState("");
  const [boards, setBoards] = useState([]);
  const [attachment, setAttachment] = useState();
  useEffect(() => {
    // 실시간으로 게시글을 작성하면 바로 보여지게끔 onSnapshot 사용
    // onSnapshot은 "dbboard"의 db에 무슨일이 있을 때(수정,삭제,등록) , 알림을 받음
    dbService.collection("dbboard").onSnapshot((snapshot) => {
      const boardArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBoards(boardArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("dbboard").add({
      text: board,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setBoard("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setBoard(value);
  };

  const onFileChange = (event) => {
    // 이미지 파일을 받기 위한 함수
    const {
      target: { files },
    } = event;
    const theFile = files[0]; // 파일은 한장만
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile); // 이미지 파일의 url을 받아옴
  };
  const onClearAttachment = () => setAttachment(null);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={board}
          onChange={onChange}
          type="text"
          placeholder="게시글을 입력하세요"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="게시글 작성하기" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {/* 모든게시글을 보여줌 */}
        {boards.map((board) => (
          <Bulletin
            key={board.id}
            BulletinObj={board}
            isOwner={board.creatorId === userObj.uid} // 계정사용자가 게시글 사용자인지 확인하기위해
          />
        ))}
      </div>
    </div>
  );
};
export default Board;
