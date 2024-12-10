import { server } from "../class/src/commons/mocks";

// src/commoms/mocks/index.js에서 만든 가짜 서버 실행을 먼저해준다
// 서버 실행을 하고 각각의 테스트 it를 테스트해보는거임
beforeAll(() => server.listen());

// 테스트가 끝나면 서버를 닫는다
afterAll(() => server.close());
// 근데 이런 서버 실행을 코드로 작성하면 테스트 100번할때마다 써줘야됨 ->  설정으로 아예 빼준다
