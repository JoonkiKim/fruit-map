import styled from "@emotion/styled";
import React from "react";
import { Carousel } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/reset.css";

// react-slick했을때 에러왕창났던거는 리액트 버전때문이었다! 리액트 18버전과 내가쓰고 있는 래액트 17버전이 충돌했기 떄문

const Wrapper = styled.div`
  background-color: skyblue;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CompWrapper = styled.div`
  /* background-color: red; */
  width: 100%;
`;

const SlideContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px;
  font-size: 24px;
  color: white;
  background-color: #364d79;
`;

const StyledCarousel = styled(Carousel)`
  .slick-prev::after,
  .slick-next::after {
    display: none;
  }

  .slick-prev::before,
  .slick-next::before {
    font-size: 50px;
    // 버튼 크기는 font-size로 조절한다!!
    /* background-color: red; */
  }

  .slick-prev,
  .slick-next {
    width: 200px; // 버튼 크기 자동 조절
    height: 200px; // 버튼 크기 자동 조절
    /* background-color: red; */
    margin-left: 800px;
    margin-right: 800px;
  }
`;

const ImgFirst = styled.img`
  width: 100%;
  height: 100%;
  background-size: cover;
`;

const ImgSecond = styled.img`
  width: 100%;
  height: 100%;
  background-size: cover;
`;

const ImgThird = styled.img`
  width: 100%;
  height: 100%;
  background-size: cover;
`;

const ImgFourth = styled.img`
  width: 100%;
  height: 100%;
  background-size: cover;
`;

export default function LayoutBanner(): JSX.Element {
  return (
    <Wrapper>
      <CompWrapper>
        <StyledCarousel arrows>
          <SlideContent>
            <ImgFirst src="/images/image.png"></ImgFirst>
          </SlideContent>
          <SlideContent>
            <ImgSecond src="/images/image 01.png"></ImgSecond>
          </SlideContent>
          <SlideContent>
            <ImgThird src="/images/image 02.png"></ImgThird>
          </SlideContent>
          <SlideContent>
            <ImgFourth src="/images/image 03.png"></ImgFourth>
          </SlideContent>
        </StyledCarousel>
      </CompWrapper>
    </Wrapper>
  );
}
