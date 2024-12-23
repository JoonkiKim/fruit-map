import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { MouseEvent } from "react";

interface FreeBoardProps {
  applyLine: boolean;
}

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffd600;
  margin-bottom: 50px;
  box-shadow: 0px 5px 20px 0px #00000026;
`;

const CompWrapper = styled.div`
  /* background-color: red; */
  width: 600px;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FreeBoard = styled.div<FreeBoardProps>`
  width: 200px;
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  position: relative;
  &:hover {
    cursor: pointer;
  }

  // 특정 요소에만 css 적용하고 싶으면 true flase를 만들어서 이렇게 적용해주면 된다
  ${({ applyLine }) =>
    applyLine &&
    `
    ::after {
      content: "";
      position: absolute;
      width: 1px;
      height: 20px;
      background-color: white;
      top: 22px; /* Centering the line vertically */
      right: -1px; /* Positioning line to the right side */
    }
  `}
`;

export default function LayoutNavigation() {
  const router = useRouter();
  const onNaviClick = (event: MouseEvent<HTMLDivElement>) => {
    router.push(event.currentTarget.id);
  };
  // 튼을 3개하지말고, map활용해서 버튼 3개 반복해서 만든다음에 각 버튼에 링크되는 '주소'를 다르게 리팩토링할 수 있다!(section18 포폴리뷰 26분대)

  const menu = [
    {
      name: "파이어베이스",
      pages: "/boards/myfirebase",
      applyLine: true,
    },
    {
      name: "고양이",
      pages: "/boards/cats",
      applyLine: true,
    },
    { name: "자유게시판", pages: "/boards", applyLine: true },
    { name: "중고마켓", pages: "/boards/market", applyLine: true },
    { name: "마이페이지", pages: "/mypage", applyLine: false },
  ];
  return (
    <Wrapper>
      <CompWrapper>
        {menu.map((el: any) => (
          <FreeBoard
            id={el.pages}
            onClick={onNaviClick}
            key={el.pages}
            applyLine={el.applyLine}
          >
            {el.name}
          </FreeBoard>
        ))}
      </CompWrapper>
    </Wrapper>
  );
}
