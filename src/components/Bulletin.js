import React, { useState } from "react";
import { dbService, storageService } from "components/fbase";
const Bulletin = ({ BulletinObj, isOwner }) => {
  // 게시글 수정을 위한 상태변수 설정
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
    <div>
      {editing ? ( // 게시글 수정상태인 경우에만 form을 보여줌
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
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        // 수정상태가 아닌 경우
        <>
          <h4>{BulletinObj.text}</h4>
          {BulletinObj.attachmentUrl && (
            <img src={BulletinObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>삭제</button>
              <button onClick={toggleEditing}>수정</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Bulletin;
