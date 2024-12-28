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
        <LogOutWrapper onClick={onToggleAlertModal}>로그아웃</LogOutWrapper>
      </div>
    </>
  );
}
