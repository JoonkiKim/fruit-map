import { useState } from "react";
import { LogOutWrapper, Wrapper } from "./mypage.style";
import dynamic from "next/dynamic";
import { auth } from "../../../commons/libraries/firebase_fruitmap";
import { browserSessionPersistence } from "firebase/auth";
import { useRecoilState } from "recoil";
import { loggedInCheck } from "../../../commons/stores";
import { useRouter } from "next/router";

const ModalAlert = dynamic(
  () => import("./mypage.style").then((mod) => mod.ModalAlert),
  {
    ssr: false, // 서버 사이드 렌더링에서 제외
  }
);

export default function MyPageComponent() {
  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInCheck);

  const onToggleAlertModal = () => {
    setIsModalAlertOpen((prev) => !prev);
  };

  // 로그아웃 함수
  const onClickLogout = async () => {
    try {
      await auth.signOut();
      await auth.setPersistence(browserSessionPersistence); // 로컬 로그인 해제
      setIsLoggedIn(false); // 로그인 상태 초기화
      setIsModalAlertOpen((prev) => !prev);
      console.log(isLoggedIn);
      router.push("/fruitsmap");
    } catch (error) {
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <>
      <Wrapper>
        마이페이지 입니다
        <LogOutWrapper onClick={onToggleAlertModal}>로그아웃</LogOutWrapper>
      </Wrapper>
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
    </>
  );
}
