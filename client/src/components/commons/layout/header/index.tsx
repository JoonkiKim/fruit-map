// import { useRouter } from "next/router";

import Link from "next/link";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { loggedInCheck } from "../../../../commons/stores";
import { auth } from "../../../../commons/libraries/firebase_fruitmap";
// import { browserSessionPersistence } from "firebase/auth";
// import { ModalAlert } from "../../../units/fruitsmap/map/map.style";

import {
  CompWrapper,
  HeaderRightWrapper,
  LogInCheckWrapper,
  LogoImg,
  LogoTxt,
  LogoWrapper,
  MoveToMypageWrapper,
  RecommendWrapper,
  Wrapper,
} from "../../../units/headercomp/header.style";

export default function LayoutHeader() {
  // const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInCheck);
  // const marketinfo = useRecoilValueLoadable(marketinfoGlobal);

  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);

  const onToggleAlertModal = () => {
    setIsModalAlertOpen((prev) => !prev);
  };

  const [randomIndex, setRandomIndex] = useState<number>(0); // 초기 값 설정
  console.log("테스트를 위해 모두 되돌림");

  // useEffect(() => {
  //   if (marketinfo.state === "hasValue" && marketinfo.contents.length > 0) {
  //     // 클라이언트에서만 랜덤 인덱스를 설정
  //     setRandomIndex(Math.floor(Math.random() * marketinfo.contents.length));
  //   }
  // }, [marketinfo]);

  return (
    <Wrapper>
      <CompWrapper>
        <LogoWrapper>
          {/* <LogoImg src="/images/fruit.png" onClick={onLogoClick}></LogoImg> */}
          <Link href="/fruitsmap" passHref>
            <a>
              <LogoImg src="/images/fruit.png" alt="과일 판매점 지도 로고" />
            </a>
          </Link>
          <LogoTxt>과일판매점 지도</LogoTxt>
        </LogoWrapper>

        {isLoggedIn ? (
          <>
            {/* <RecommendWrapper>
              {marketinfo.state === "hasValue" && marketinfo.contents.length > 0
                ? randomIndex !== null
                  ? `오늘은 ${marketinfo.contents[randomIndex]?.name} ${marketinfo.contents[randomIndex]?.menu} 어때요?`
                  : "추천 과일을 찾는 중입니다."
                : "추천 과일을 찾는 중입니다."}
            </RecommendWrapper> */}
            <HeaderRightWrapper>
              <LogInCheckWrapper>
                {auth?.currentUser?.displayName}님 환영합니다!
              </LogInCheckWrapper>

              <Link href="fruitsmap/mypage" passHref>
                <MoveToMypageWrapper as="a">
                  마이페이지로 이동하기
                </MoveToMypageWrapper>
              </Link>
            </HeaderRightWrapper>
          </>
        ) : (
          <Link href="/login" passHref>
            <LogInCheckWrapper as="a">로그인 / 회원가입</LogInCheckWrapper>
          </Link>
        )}
      </CompWrapper>

      {!isLoggedIn && (
        <Link href="/fruitsmap" passHref>
          <a style={{ display: "none" }}></a>
        </Link>
      )}
    </Wrapper>
  );
}
