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

        //console.log(myprofileArray[0].profileMajor);
        //mymajor = myprofileArray[0].profileMajor;
        //setMajor(myprofileArray[0].profileMajor);
        userObj.major = myprofileArray[0].profileMajor;
        console.log(userObj.major);
        //console.log(mymajor);
      });

    dbService
      .collection("dbprofile")
      .where("profileMajor", "==", "공학계열")
      .onSnapshot((snapshot) => {
        const mylistArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLists(mylistArray);
        //console.log(mymajor);
        /* console.log(mylistArray);
        console.log(mylistArray[0].profileMajor);
        console.log(mylistArray); */
      });
  }, []);
  return (
    <div>
      {lists.map((mylist) => (
        <div key={mylist.id}>
          <Grid item xs={12}>
            <Paper>이름 : {mylist.name}</Paper>
            <Paper>나이 : {mylist.profileAge}</Paper>
            <Paper>대학 : {mylist.profileCollege}</Paper>
            <Paper>주소 : {mylist.profileAddress}</Paper>
            <Paper>전공 : {mylist.profileMajor}</Paper>
          </Grid>
          <br></br>
        </div>
      ))}
    </div>
  );
};
export default List;
