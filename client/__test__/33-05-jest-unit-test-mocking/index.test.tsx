// 백엔드에 API요청을 날려야 하는 테스트를 해보쟈

// 가짜 서버 실행은 src/commoms/mocks/index.js에서 한다

// 1. 렌더링
// 2. 작성자 제목, 내용 인풋창에 값 입력
// 3. 등록하기 버튼 클릭
// 4. 뮤테이션 날리기 => ** 여기서 가짜 API를 만든다 -> 가짜 응답을 줄때 아이디를 qqq로 줄거임 (가짜 api는 src/commoms/mocks/apis.js에 들어있음)
// 5. 등록된 페이지로 이동 -> [최종검증해야되는 내용] router.push("/boards/qqq")가 잘 실행되었는지 아이디가 qqq가 맞는지 확인해야됨

// @ts-nocheck
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import StaticRoutingMovedPage from "../../pages/section33/33-05-jest-unit-test-mocking";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import fetch from "cross-fetch";
import mockRouter from "next-router-mock";

// router이동은 브라우저에서만 가능한건데 테스트는 브라우저에서 안하게됨 -> 가짜 라우터도 만들어줘야 한다

// 지금부터 입력하는 애들은 모두 가짜로 대체해줘라는 뜻
// "next/router"가 발견되면 "next-router-mock"으로 대체하게 된다
jest.mock("next/router", () => require("next-router-mock"));

// import { server } from "../../src/commons/mocks";
// // src/commoms/mocks/index.js에서 만든 가짜 서버 실행을 먼저해준다
// // 서버 실행을 하고 각각의 테스트 it를 테스트해보는거임
// beforeAll(() => server.listen());

// // 테스트가 끝나면 서버를 닫는다
// afterAll(() => server.close());
// // 근데 이런 서버 실행을 코드로 작성하면 테스트 100번할때마다 써줘야됨 ->  설정으로 아예 빼준다

it("게시글이 잘 등록되는지 테스트하자", async () => {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: "http://mock.com/graphql",
      fetch,
    }),
    cache: new InMemoryCache(),
  });

  render(
    <ApolloProvider client={client}>
      <StaticRoutingMovedPage />
    </ApolloProvider>
  );
  // 여기는 app.tsx가 실행되는게 아니라 테스트 코드가 연결되어있는 애들만 실행되는거기 때문에 apollo를 실행시켜주기 위한 apolloProvider를 따로 감싸줘야된다 -> 위에처럼 감싸주면 useQuery, useMutation이 다 가능하다

  // getByRole에서 가져오는 role은 div태그 옆에 적어준다
  fireEvent.change(screen.getByRole("input-writer"), {
    target: { value: "맹구" }, // 여기서 맹구를 쓴게  setWriter(event.target.value)에 들어간다
  });

  fireEvent.change(screen.getByRole("input-title"), {
    target: { value: "안녕하세요" },
  });

  fireEvent.change(screen.getByRole("input-contents"), {
    target: { value: "반갑습니다" },
  });

  fireEvent.click(screen.getByRole("submit-button"));
  // 이렇게 그냥 요청을 날리면 진짜 mutation이 날라간다.그래서 가짜를 만들어줘야된다

  // mutation요청을 기다렸다가 아래의 비교 로직을 실행해야되기 때문에 await를 넣어준다
  // mockRouter.asPath에 우리가 이동하기를 기대하는 주소가 담긴다
  await waitFor(() => {
    expect(mockRouter.asPath).toEqual("/boards/qqq");
  });
});
