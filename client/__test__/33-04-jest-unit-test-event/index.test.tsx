// 버튼 같은거 클릭 시 기능이 잘 작동하는지 테스트 해보기

import JestUnitTestPage from "../../pages/section33/33-04-jest-unit-test-event";

import { fireEvent, render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

it("버튼을 눌렀을때 제대로 작동하는지 테스트하자", () => {
  render(<JestUnitTestPage />);


  // fireEvent를 통해서 대신 클릭하는거임
  fireEvent.click(
    screen.getByRole("count-button"))

  // fireEvent를 통해 count-button(버튼 태그)을 클릭하고, count(div 태그)에 들어가는 값이 1일거라고 예상하는 코드
  expect(screen.getByRole("count")).toHaveTextContent("1")

});
