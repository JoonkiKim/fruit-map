// // 액세스 토큰이 만료된 경우, 리프레시토큰을 통해 액세스 토큰을 새로 발급받는 로직

// import { gql, GraphQLClient } from "graphql-request";
// import { IMutation } from "../types/generated/types";

// const RESTORE_ACCESS_TOKEN = gql`
//   mutation {
//     restoreAccessToken {
//       accessToken
//     }
//   }
// `;

// export const getAccessToken = async (): Promise<string | undefined> => {
//   try {
//     const graphQLClient = new GraphQLClient(
//       "https://backend-practice.codebootcamp.co.kr/graphql",
//       { credentials: "include" },
//     );
//     const result =
//       await graphQLClient.request<Pick<IMutation, "restoreAccessToken">>(
//         RESTORE_ACCESS_TOKEN,
//       );
//     // request의 타입을 모르겠으면 types.ts로 가서 restoreAccessToken의 타입을 확인하면 된다

//     const newAccessToken = result?.restoreAccessToken.accessToken;
//     return newAccessToken;
//   } catch (error) {
//     if (error instanceof Error) console.log(error.message);
//     return undefined;
//   }
// };
