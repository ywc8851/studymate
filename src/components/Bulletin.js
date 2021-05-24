import React, { useState } from "react";
import { dbService, storageService } from "components/fbase";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PostView from "../routes/PostView";
import { useHistory, Link } from "react-router-dom";
const Bulletin = ({ BulletinObj, isOwner }) => {
  // 게시글 수정을 위한 상태변수 설정
  const [clicking, setClicking] = useState(false);
  const [editing, setEditing] = useState(false); // 수정상태인지 아닌지
  const [newBulletin, setNewBulletin] = useState(BulletinObj.text); // input에 입렫된 text를 업데이트
  const onDeleteClick = async () => {
    const ok = window.confirm("이 게시글을 삭제하시겠습니까?");
    if (ok) {
      // ok가 true면 게시글 삭제
      await dbService.doc(`dbboard/${BulletinObj.id}`).delete();
      await storageService.refFromURL(BulletinObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const toggleClicking = () => setClicking((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`dbboard/${BulletinObj.id}`).update({
      // 게시글의 id를 찾아서 update해줌
      text: newBulletin,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewBulletin(value);
  };

  return (
    <>
      {editing ? ( // 수정상태인 경우에만 form을 보여줌
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="수정할 게시글을 입력하세요"
              value={newBulletin}
              required
              onChange={onChange}
            />
            <input type="submit" value="수정하기" />
          </form>

          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        // 수정상태가 아닌 경우
        <>
          <TableRow>
            <TableCell>
              <Link to={`/postView/${BulletinObj.bulletinId}`}>
                {BulletinObj.title}
              </Link>
            </TableCell>

            <TableCell>
              {BulletinObj.attachmentUrl && (
                <img
                  src={BulletinObj.attachmentUrl}
                  width="50px"
                  height="50px"
                />
              )}
            </TableCell>
            <TableCell>{BulletinObj.createdAt}</TableCell>
            <TableCell>{BulletinObj.creatorId}</TableCell>
            <TableCell>
              {isOwner && (
                <>
                  <button onClick={toggleEditing}>수정</button>
                </>
              )}
            </TableCell>
            <TableCell>
              {isOwner && (
                <>
                  <button onClick={onDeleteClick}>삭제</button>
                </>
              )}
            </TableCell>
          </TableRow>
        </>
      )}

      {/*  {isOwner && (
            <>
              <button onClick={onDeleteClick}>삭제</button>
              <button onClick={toggleEditing}>수정</button>
            </>
          )} */}
    </>
  );
};

export default Bulletin;
