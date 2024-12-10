// 아까는 내용을 하나씩 체크했다면, 이제는 기존에 있는 내용이랑 달라진게 없는지 스냅샷을 찍어놓고 확인해보는 방식으로 테스트를 한다

import JestUnitTestPage from "../../pages/section33/33-03-jest-unit-test-snapshot";

import { render } from "@testing-library/react";

import "@testing-library/jest-dom";

it("기존 사진이랑 바뀐게 없는지 비교해보자!! - 스냅샷 테스트", () => {
  const result = render(<JestUnitTestPage />);

  // toMatchInlineSnapshot에서 사진이 없으면 사진을 찍고, 사진이 있으면 사진을 비교한다

  // 기존에 찍은 사진에서 스냅샷을 업데이트 하고 싶으면 yarn test -u 를 터미널에서 실행하기
  expect(result.container).toMatchInlineSnapshot(`
    <div>
      <div>
        철수는 15살 입니다
      </div>
      철수의 취미 입력하기 : 
      <input
        type="text"
      />
      <button>
        철수랑 놀러가기
      </button>
    </div>
  `);
});
