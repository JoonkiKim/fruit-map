import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { loggedInCheck, marketinfoGlobal } from "../../../../commons/stores";
import {
  auth,
  firebasefruitapp,
} from "../../../../commons/libraries/firebase_fruitmap";
import { browserSessionPersistence, getAuth, signOut } from "firebase/auth";
import { ModalAlert } from "../../../units/fruitsmap/map/map.style";

import {
  CompWrapper,
  HeaderRightWrapper,
  LogInCheckWrapper,
  LogoImg,
  LogoTxt,
  LogOutWrapper,
  LogoWrapper,
  RecommendWrapper,
  Wrapper,
} from "../../../units/headercomp/header.style";

export default function LayoutHeader() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInCheck);
  const marketinfo = useRecoilValueLoadable(marketinfoGlobal);

  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);

  const onToggleAlertModal = () => {
    setIsModalAlertOpen((prev) => !prev);
  };

  const [randomIndex, setRandomIndex] = useState(null); // 초기 값 설정

  useEffect(() => {
    if (marketinfo.state === "hasValue" && marketinfo.contents.length > 0) {
      // 클라이언트에서만 랜덤 인덱스를 설정
      setRandomIndex(Math.floor(Math.random() * marketinfo.contents.length));
    }
  }, [marketinfo]);

  const onLogoClick = () => {
    router.push(`/fruitsmap`);
  };

  const onClickMovetoLogin = () => {
    router.push(`/login`);
  };

  // 로그아웃 함수
  const onClickLogout = async () => {
    try {
      await auth.signOut();
      await auth.setPersistence(browserSessionPersistence); // 로컬 로그인 해제
      setIsLoggedIn(false); // 로그인 상태 초기화
      setIsModalAlertOpen((prev) => !prev);
      router.reload(); // 화면 전체 새로고침
      router.push("/fruitsmap");
    } catch (error) {
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <Wrapper>
      <CompWrapper>
        <LogoWrapper>
          <LogoImg src="/images/fruit.png" onClick={onLogoClick}></LogoImg>
          <LogoTxt>과일판매점 지도</LogoTxt>
        </LogoWrapper>

        {isLoggedIn && (
          <RecommendWrapper>
            {marketinfo.state === "hasValue" && marketinfo.contents.length > 0
              ? randomIndex !== null
                ? `오늘은 ${marketinfo.contents[randomIndex]?.name} ${marketinfo.contents[randomIndex]?.menu} 어때요?`
                : "추천 과일을 찾는 중입니다."
              : "추천 과일을 찾는 중입니다."}
          </RecommendWrapper>
        )}

        {isLoggedIn ? (
          <HeaderRightWrapper>
            <LogInCheckWrapper>
              {auth?.currentUser?.displayName}님 환영합니다!
            </LogInCheckWrapper>
            <LogOutWrapper onClick={onToggleAlertModal}>로그아웃</LogOutWrapper>
          </HeaderRightWrapper>
        ) : (
          <LogInCheckWrapper onClick={onClickMovetoLogin}>
            로그인/회원가입
          </LogInCheckWrapper>
        )}
      </CompWrapper>

      {isModalAlertOpen && (
        <ModalAlert
          open={isModalAlertOpen}
          onClose={onToggleAlertModal}
          onOk={onClickLogout}
          onCancel={onToggleAlertModal}
        >
          <span>로그아웃 하시겠습니까?</span>
        </ModalAlert>
      )}
    </Wrapper>
  );
}
