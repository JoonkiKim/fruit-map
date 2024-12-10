import { graphql } from "msw";

const gql = graphql.link("http://mock.com/graphql");

export const apis = [
  gql.mutation("createBoard", (req, res, ctx) => {
    // ctx에는 헤더 같은 추가 정보가 들어온다

    // 이게 api요청값
    const { writer, title, contents } = req.variables.createBoardInput;
    // 아까 테스트 코드에서 입력한 인풋 값들이 여기로 들어와서 api요청이 들어간다

    // 이게 api응답값
    return res(
      ctx.data({
        createBoard: {
          _id: "qqq",
          writer,
          title,
          contents,
          __typename: "Boards",
          // __typename은 어떤 요청을 보내도 나오는거라서 실제 요청과 비슷하게 해주기 위해 넣는것
        },
      })
    );
  }),

  // 뮤테이션 말고 쿼리를 해보고 싶으면 아래처럼 쭉쓰면된다
  //   gql.query("fetchBoards", () => {})
];
