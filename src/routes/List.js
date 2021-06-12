import React, { useState, useEffect } from "react";
import { authService, dbService } from "components/fbase";
import { useHistory, Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
var mymajor;
const List = ({ userObj }) => {
  const [lists, setLists] = useState([]);
  const [myobject, setMyobject] = useState("");
  const [major, setMajor] = useState("");

  useEffect(() => {
    dbService
      .collection("dbprofile")
      .where("profileId", "==", userObj.uid)
      .onSnapshot((snapshot) => {
        const myprofileArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        userObj.major = myprofileArray[0].profileMajor;
        console.log(userObj.major);
      });

    dbService
      .collection("dbprofile")
      .where("profileMajor", "==", userObj.major)
      .onSnapshot((snapshot) => {
        const mylistArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLists(mylistArray);
      });
  }, []);
  return (
    <div>
      {lists.map((mylist) => (
        <div
          key={mylist.id}
          style={{
            width: "50%",
            textAlign: "center",
            marginLeft: "400px",
            //display: "flex",
            //justifyContent: "center",
            //alignItems: "center",
            border: "10px solid lightblue",
            marginTop: " 10px",
          }}
        >
          <Grid item xs={12}>
            <Paper>이름 : {mylist.name}</Paper>
            <Paper>나이 : {mylist.profileAge}</Paper>
            <Paper>대학 : {mylist.profileCollege}</Paper>
            <Paper>주소 : {mylist.profileAddress}</Paper>
            <Paper>전공 : {mylist.profileMajor}</Paper>
          </Grid>
        </div>
      ))}
    </div>
  );
};
export default List;
