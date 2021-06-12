import React, { useState, useEffect } from "react";
import { dbService, storageService } from "components/fbase";
import { v4 as uuidv4 } from "uuid";
import Pagination from "../components/Pagination";
import Posts from "../components/Posts";
import TextField from "@material-ui/core/TextField";

const Board = ({ userObj }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [board, setBoard] = useState("");
  const [boards, setBoards] = useState([]);
  const [attachment, setAttachment] = useState(""); // 이미지 url을 관리하는 state
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지상태를 관리하는 state
  const [postsPerPage, setPostsPerPage] = useState(5); // 한페이지당 들어갈 게시글수를 관리하는 state
  useEffect(() => {
    dbService
      .collection("dbprofile")
      .where("profileId", "==", userObj.uid)
      .onSnapshot((snapshot) => {
        const nameArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setName(nameArray[0].name);
      });
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

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    // 게시글을 잘라서 Post로 보내주는 함수
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }
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
    const d = new Date();
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    const getDate = [year, month, day].join("-");
    const boardObj = {
      title: title,
      text: board,
      createdAt: Date.now(),
      createdDate: getDate,
      creatorId: userObj.uid,
      creatorNickname: name,
      attachmentUrl,
    };
    console.log(boardObj.createdAt);
    await dbService.collection("dbboard").add(boardObj);
    setDate("");
    setTitle("");
    setBoard("");
    setAttachment("");
  };

  const onChangeContent = (event) => {
    const {
      target: { value },
    } = event;
    setBoard(value);
  };
  const onChangeTitle = (event) => {
    const {
      target: { value },
    } = event;
    setTitle(value);
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
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          value={title}
          onChange={onChangeTitle}
          type="text"
          placeholder="제목을 입력하세요"
          maxLength={50}
        />
        <TextField
          value={board}
          onChange={onChangeContent}
          type="text"
          placeholder="게시글을 입력하세요"
          maxLength={500}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="글 작성하기" />
        {attachment && ( // attachment가 있는 경우에만 이미지 미리 보여줌
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>업로드 취소</button>
          </div>
        )}
      </form>

      <Posts boards={currentPosts(boards)} userObj={userObj}></Posts>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={boards.length}
        paginate={setCurrentPage}
      ></Pagination>
    </div>
  );
};

export default Board;
