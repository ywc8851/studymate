import React, { useState } from "react";
import { authService, firebaseInstance } from "components/fbase";
import "@fontsource/roboto";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Background from "../study.jpg";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        조용우
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  social: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    marginright: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 0.5),
  },
}));
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false); // 기존사용자인 경우로 설정
  const [error, setError] = useState("");
  const onChange = (event) => {
    // input에 입력한 값들을 저장
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      // name이 email이면 state인 email을 변경
      setEmail(value);
    } else if (name === "password") {
      // name이 password면 password를 변경
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data; // 데이터를 담을 변수
      if (newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(
          // 이메일과 비밀번호 입력아서 회원가입하기
          email,
          password
        );
      } else {
        // 이메일과 비밀번호를 입력받아서 log in 하기
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      //console.log(data);
    } catch (error) {
      // 에러 발생시 에러 출력
      setError(error.message);
      alert(error);
    }
  };
  // newAccount의 이전 값을 가져와서 그 값에 반대되는 것을 리턴
  const toggleAccount = () => setNewAccount((prev) => !prev);

  // 소셜로그인 함수 (팝업창을 띄움)
  const onGoogleClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;

    provider = new firebaseInstance.auth.GoogleAuthProvider();

    const data = await authService.signInWithPopup(provider);
  };
  const onGithubClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;

    provider = new firebaseInstance.auth.GithubAuthProvider();

    const data = await authService.signInWithPopup(provider);
  };
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HomeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Study Mate
          </Typography>
          <form onSubmit={onSubmit} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              type="email"
              placeholder="Email"
              label="Email"
              required
              value={email} // TextField의 value는 email에 저장
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              type="password"
              placeholder="Password"
              label="Password"
              required
              value={password} // TextField value는 password에 저장
              onChange={onChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              로그인
            </Button>
            <Button
              onClick={toggleAccount}
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              회원가입
            </Button>
          </form>
          <div>
            <Button
              onClick={onGoogleClick}
              variant="contained"
              className={classes.submit}
              startIcon={<FcGoogle />}
            >
              구글로 로그인
            </Button>

            <Button
              onClick={onGithubClick}
              variant="contained"
              className={classes.submit}
              startIcon={<FaGithub />}
            >
              깃허브로 로그인
            </Button>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};
export default Auth;
