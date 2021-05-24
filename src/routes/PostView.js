import React, { useState, useEffect } from "react";
import { dbService, storageService } from "components/fbase";
import Bulletin from "../components/Bulletin";
import { useHistory, Link } from "react-router-dom";
import "../css/postview.css";
const PostView = ({ history, location, match }) => {
  const [data, setData] = useState("");
  const { no } = match.params;
  const onClickBack = () => {
    history.goBack();
    setData("");
  };
  useEffect(() => {
    // bulletinId와 no가 같은 게시글 불러오기
    dbService
      .collection("dbboard")
      .where("bulletinId", "==", no)
      .onSnapshot((snapshot) => {
        const boardArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(boardArray);
      });
  }, []);
  // 불러온 게시글은 data[0]에 저장되어있다.
  if (data.length !== 0) {
    console.log(data[0].title);
  }

  return (
    <>
      <h2 align="center">게시글 상세정보</h2>

      <div className="post-view-wrapper">
        {data ? (
          <>
            <div className="post-view-row">
              <label>게시글 번호 </label>
              <label>{data[0].bulletinId}</label>
            </div>
            <div className="post-view-row">
              <label>제목</label>
              <label>{data[0].title}</label>
            </div>
            <div className="post-view-row">
              <label>글내용</label>
              <label>{data[0].text}</label>
            </div>
          </>
        ) : (
          "해당 게시글을 찾을 수 없습니다."
        )}
        <button className="post-view-go-list-btn" onClick={onClickBack}>
          목록으로 돌아가기
        </button>
      </div>
    </>
  );
};
export default PostView;
