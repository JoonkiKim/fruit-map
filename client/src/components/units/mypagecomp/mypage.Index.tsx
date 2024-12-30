import { useState } from "react";
import { LogOutWrapper } from "../headercomp/header.style";

export default function MyPageComponent() {
  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);

  const onToggleAlertModal = () => {
    setIsModalAlertOpen((prev) => !prev);
  };

  return (
    <>
      <div>
        마이페이지 입니다
        <LogOutWrapper onClick={onToggleAlertModal}>로그아웃</LogOutWrapper>
      </div>
    </>
  );
}
