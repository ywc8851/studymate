import React, { useState } from "react";
import { authService, dbService } from "components/fbase";
import { useHistory, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  button: {
    width: "50%",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginLeft: "400px",
  },
}));
export default ({ refreshUser, userObj }) => {
  const classes = useStyles();
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <div>
      <Link
        to={"/editprofile"}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <Button variant="outlined" color="primary" className={classes.button}>
          프로필 변경
        </Button>
      </Link>
      <br></br>
      <br></br>
      <Link
        to={"/myboard"}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <Button variant="outlined" color="primary" className={classes.button}>
          내가 작성한 글
        </Button>
      </Link>
      <br></br>
      <br></br>
      <Button
        variant="outlined"
        onClick={onLogOutClick}
        color="secondary"
        className={classes.button}
      >
        로그아웃
      </Button>
    </div>
  );
};
