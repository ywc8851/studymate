import React, { useState, useEffect } from "react";
import { dbService } from "components/fbase";
import Bulletin from "../components/Bulletin";

const Myboard = ({ userObj }) => {
  const [myboards, setMyboards] = useState([]);

  useEffect(() => {
    // �ǽð����� �Խñ��� �ۼ��ϸ� �ٷ� �������Բ� onSnapshot ���
    // onSnapshot�� "dbboard"�� db�� �������� ���� ��(����,����,���) , �˸��� ����
    // orderBy�� ���ۼ� ��¥���� ������������ �����Ͽ� �����ֱ�
    dbService
      .collection("dbboard")
      .where("creatorId", "==", userObj.uid) // �����ۼ��� �Խñ۸�
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
          isOwner={myboard.creatorId === userObj.uid} // ��������ڰ� �Խñ� ��������� Ȯ���ϱ�����
        />
      ))}
    </div>
  );
};
export default Myboard;
