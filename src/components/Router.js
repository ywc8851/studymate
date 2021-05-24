import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";
import Board from "routes/Board";
import Myboard from "routes/Myboard";
import PostView from "routes/PostView";
import EditProfile from "routes/EditProfile";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? ( // 로그인 성공 : home , 로그인 실패 : auth
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/board">
              <Board userObj={userObj} />
            </Route>

            <Route path="/postView/:no" component={PostView} />

            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </Route>
            <Route exact path="/editprofile">
              <EditProfile userObj={userObj} refreshUser={refreshUser} />
            </Route>
            <Route path="/myboard">
              <Myboard userObj={userObj} refreshUser={refreshUser} />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;
