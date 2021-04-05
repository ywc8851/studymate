import React, { useState, useEffect } from "react";
import { dbService } from "components/fbase";

const Board = ({ userObj }) => {
  const [board, setBoard] = useState("");
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // 실시간으로 게시글을 작성하면 바로 보여지게끔 onSnapshot 사용
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
        <input type="submit" value="게시글 작성하기" />
      </form>
      <div>
        {/* 모든게시글을 보여줌 */}
        {boards.map((board) => (
          <div key={board.id}>
            <h4>{board.text}</h4>
            <span>게시글 작성자:{board.creatorId}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Board;
