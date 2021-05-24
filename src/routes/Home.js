import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Container from "@material-ui/core/Container";
import MainFeaturedPost from "../components/MainFeaturedPost";
import HomeImage from "../home.jpg";
const Home = () => {
  const mainFeaturedPost = {
    title: "공부메이트란?",
    description:
      "공부메이트는 집 주변이나 학교 주변에서 같이 공부할 사람을 매칭 시켜주는 서비스입니다. 정보를 입력하여 자신에게 어울리는 공부메이트를 찾아보세요!",
    image: `url(${HomeImage})`,
    imgText: "main image description",
    linkText: "정보 입력하기",
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
      </Container>
    </React.Fragment>
  );
};
export default Home;
