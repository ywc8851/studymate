import React from "react";
import Bulletin from "./Bulletin";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const Posts = ({ boards, userObj }) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>제목</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>작성날짜</TableCell>
            <TableCell>작성자</TableCell>
            <TableCell>수정</TableCell>
            <TableCell>삭제</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {boards.map((board) => (
            <>
              <Bulletin
                key={board.id}
                BulletinObj={board}
                isOwner={board.creatorId === userObj.uid}
              />
            </>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
export default Posts;
