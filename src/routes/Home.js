import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Container from "@material-ui/core/Container";
import FirstMain from "../components/FirstMain";
import SecondMain from "../components/SecondMain";
import ThirdMain from "../components/ThirdMain";
import HomeImage from "../home.jpg";
const Home = () => {
  const firstInfo = {
    title: "공부메이트란?",
    description:
      "공부메이트는 집 주변이나 학교 주변에서 같이 공부할 사람을 매칭 시켜주는 서비스입니다. 정보를 입력하여 자신에게 어울리는 공부메이트를 찾아보세요!",
    image: `url(${HomeImage})`,
    imgText: "main image description",
    linkText: "정보 입력하기",
  };
  const secondInfo = {
    title: "추천리스트",
    description: "프로필에 기반하여 주변의 매칭가능한 공부메이트를 만나보세요!",
    image: `url(${HomeImage})`,
    imgText: "sub image description",
    linkText: "추천메이트 보러가기",
  };
  const thirdInfo = {
    title: "게시판",
    description: "게시판을 통해 공부메이트들과 소통할 수 있습니다!",
    image: `url(${HomeImage})`,
    imgText: "sub image description",
    linkText: "게시판 보러가기",
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <FirstMain post={firstInfo} />
        </main>
      </Container>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            flex: "1",
            paddingLeft: "100px",
          }}
        >
          <Container maxWidth="sm">
            <SecondMain post={secondInfo} />
          </Container>
        </div>
        <div
          style={{
            flex: "1",
            paddingRight: "100px",
          }}
        >
          <Container maxWidth="sm">
            <ThirdMain post={thirdInfo} />
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Home;
