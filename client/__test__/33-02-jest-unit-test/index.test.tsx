// 간단한 UI테스트 방식

// 테스트를 하나씩 다 하면 시간이 오래걸리기 때문에 보통 핵심 기능에 대한 테스트만 진행하고, 나머지는 에러가 발생했을때 그거에 대한 테스트코드를 쌓아가는 방식으로 진행한다

import JestUnitTestPage from "../../pages/section33/33-02-jest-unit-test";

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

it("내가 원하는대로 그려지는지 테스트하기", () => {
  // 이렇게 render안에 컴포넌트를 넣어주면 그안에서 그림이 그려지게 된다
  render(<JestUnitTestPage />);

  // 텍스트를 테스트해보는 방법
  const myText = screen.getByText("철수는 13살 입니다");
  expect(myText).toBeInTheDocument();

  const myText2 = screen.getByText("철수의 취미 입력하기 :");
  expect(myText2).toBeInTheDocument();

  const myText3 = screen.getByText("철수랑 놀러가기");
  expect(myText3).toBeInTheDocument();
});
