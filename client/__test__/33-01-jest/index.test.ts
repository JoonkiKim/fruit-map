import { add } from "../../pages/section33/33-01-jest";

// expect가 안되는 에러가 있었는데, 구글링으로 eslint자리에 jest: true,를 넣어서 해결함
it("더하기 잘 되는지 테스트 해보기", () => {
  const result = add(3, 5);
  expect(result).toBe(8);
});

// 아래처럼 그룹으로 테스트 할수도 있다

// describe("나만의 테스트 그룹 만들기", () => {

//   it("더하기 잘 되는지 테스트 해보기", () => {
//     const result = add(3, 5);
//     expect(result).toBe(8);
//   });

//   it("빼기 잘 되는지 테스트 해보기", () => {
//     const result = add(3, 5);
//     expect(result).toBe(8);
//   });

//   it("곱하기 잘 되는지 테스트 해보기", () => {
//     const result = add(3, 5);
//     expect(result).toBe(8);
//   });

// })
