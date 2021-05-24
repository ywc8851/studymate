import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const Navigation = ({ userObj }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Button variant="h6" className={classes.title}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              홈
            </Link>
          </Button>

          <Button variant="h6" className={classes.title}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              추천리스트
            </Link>
          </Button>

          <Button variant="h6" className={classes.title}>
            <Link
              to="/board"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              게시판
            </Link>
          </Button>

          <Button variant="h6" className={classes.title}>
            <Link
              to="/profile"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {userObj.displayName}의 프로필
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;
