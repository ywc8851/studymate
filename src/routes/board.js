import React, { useState, useEffect } from "react";
import { dbService, storageService } from "components/fbase";
import { v4 as uuidv4 } from "uuid";
import Bulletin from "../components/Bulletin";

const Board = ({ userObj }) => {
  const [board, setBoard] = useState("");
  const [boards, setBoards] = useState([]);
  const [attachment, setAttachment] = useState(""); // 이미지 url을 관리하는 state
  useEffect(() => {
    // 실시간으로 게시글을 작성하면 바로 보여지게끔 onSnapshot 사용
    // onSnapshot은 "dbboard"의 db에 무슨일이 있을 때(수정,삭제,등록) , 알림을 받음
    // orderBy로 글작성 날짜기준 내림차순으로 정렬하여 보여주기
    dbService
      .collection("dbboard")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const boardArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBoards(boardArray);
      });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL(); // 이미지 url을 다운로드하여 저장
    }
    // const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`); // file에 대한 reference
    // const response = await fileRef.putString(attachment, "data_url"); // format : data_url

    // await dbService.collection("dbboard").add({
    const boardObj = {
      text: board,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("dbboard").add(boardObj);
    setBoard("");
    setAttachment("");
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
      // reader에 eventlistener 추가
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result); // onloadend에 finishedEvent의 result를 setAttachment로 설정
    };
    reader.readAsDataURL(theFile); // 이미지 파일의 url을 받아옴
  };
  const onClearAttachment = () => setAttachment(""); // 업로드취소

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
        {attachment && ( // attachment가 있는 경우에만 이미지 보여줌
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>업로드 취소</button>
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
