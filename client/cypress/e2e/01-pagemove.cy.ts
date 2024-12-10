/* eslint-disable no-undef */

it("페이지 이동 시나리오", () => {
  cy.visit("localhost:3000/section33/33-06-cypress-e2e-test/");

  cy.get("button").contains("철수랑 놀러가기").click();
  // 버튼이 여러개라면 버튼을 지정해줘야된다!

  cy.get("div").contains("철수야 놀자");
});
