// _app.tsx에 있는 설정내용이 너무 길어지는 것을 방지하기 위해 props.children을 이용해서 설정파일을 분리해준다

// 이제 아폴로 관련 설정은 여기서만 하면 된다
// 이런걸 "리팩토링" 이라고 부른다

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // fromPromise,
} from "@apollo/client";

// import { ApolloLink } from "@apollo/client/link/core";

// import { createUploadLink } from "apollo-upload-client";
// // import {
// //   accessTokenState,
// //   restoreAccessTokenLoadable,
// // } from "../../../../commons/stores";
// import { useRecoilState, useRecoilValueLoadable } from "recoil";
// import { useEffect } from "react";

import type React from "react";

// import { onError } from "@apollo/client/link/error";

// import { getAccessToken } from "../../../../commons/libraries/getAccessToken";

// 사진, 파일을 업로드하기 위해서는 apollo-upload-client가 필요하다

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps) {
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  // useRecoilValueLoadable은 '데이터'를 전역으로 공유할 수 있게 하는 것!
  // store에 있는 공용 함수에서 요청이 되고, 로그인체크와 아폴로세팅 모두에서 그 데이터를 사용할 수 있는것!
  // const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);

  // <로컬스토리지와 프리렌더링>
  // localstorage를 그냥 실행하면 프론트엔드 서버로 가서 프리렌더링을 진행할때 에러남(코드를 실행하면 프론트엔드 서버에서 프리렌더링->브라우저 렌더링 순서로 실행되는데 프론트엔드 서버에는 브라우저와 달리 로컬스토리지가 없기 때문에 localstorage is not defined가 뜨는것)
  //   // 따라서 해결방법은 1) 브라우저일때만 로컬스토리지 적용, 2) useEffect를 통해 프리렌더링&렌더링 둘다 완료되었을때만 로컬스토리지적용
  // 프리렌더링할때 로컬스토리지 부분에서 에러가 발생하기 때문에 그걸 건너뛰는 방법을 아래에서 해보는거임
  // //  브라우저임을 확인하는 방법 [프리렌더링 예제] 1) process.browser임을 확인하기
  // if (process.browser) {
  //   console.log("지금은 브라우저이다!");
  //   alert("반가워요!");
  //   // 새로고침해도 로컬스토리지에 잇던 엑새스토큰 값을 가져와서 글로벌스테이트에 담는다
  //   const result = localStorage.getItem("accessToken");
  //   // accessToken은 키값이다 -> result에 로컬스토리지에 있던 accessToken값이 담기게 되고 그걸 setAccessToken을 통해 글로벌 스테이트에 담아주는거임
  //   setAccessToken(result ?? "");
  //
  // } else {
  //   console.log(
  //     "지금은 프론트엔드 서버다!! yarn dev로 실행시킨 프로그램 내부이다!",
  //   );
  // }

  // // 브라우저임을 확인하는 방법 [프리렌더링 예제] 2) 현재 window임을 확인하기

  // if (typeof window !== "undefined") {
  //   console.log("지금은 브라우저이다!");
  // } else {
  //   console.log(
  //     "지금은 프론트엔드 서버다!! yarn dev로 실행시킨 프로그램 내부이다!",
  //   );
  // }

  // 브라우저임을 확인하는 방법 [프리렌더링 무시] 3) useEffect활용하기
  // 이렇게해주면 렌더링이 다 끝난다음에 로컬스토리지를 요청하니까 프리렌더링 부분을 생략하고 브라우저에서 로컬스토리지에 접근하게 된다

  // [새로고침해도 액세스토큰 유지하는 방법]
  // 로컬스토리지말고, 다른 방식!
  // useEffect(() => {
  //   // console.log(aaa);
  //   // 3. 리프레시토큰 & 전역함수 사용하기
  //   // 아래의 2번처럼 getAccessToken()을 직접하는게 아니라, 글로벌 함수에서 받아온 데이터를 여기서 불러오는 방식으로 한다!
  //   aaa.toPromise().then((newAccessToken) => {
  //     setAccessToken(newAccessToken);
  //   });

  //   // getAccessToken().then((newAccessToken) => {
  //   //   setAccessToken(newAccessToken ?? "");
  //   // });

  //   // 여기서 문제는 아폴로세팅에서도 리프레시를 하고 로그인체크에서도 리프레시를 한다는점. 그럼 api요청이 두번들어간다.
  //   // 두번 날리지 않고, 리코일(글로벌스테이트)에서 한번만 데이터를 받아서 두 곳에서 쓸 수 있다!
  //   // ** useRecoilValueLoadable를 활용한다
  // }, []);
  // console.log("나는 지금 브라우저이다!!!");

  // 1. 기존 로컬스토리지 방식(refreshToken배우기 이전)
  // const result = localStorage.getItem("accessToken");

  // 2. 새로운 방식(refreshToken 이후)
  // 리프레시 토큰은 브라우저 쿠키에 저장되어있기 때문에 사라지지 않는다!

  // // getAccessToken은 library에 내가 만들어놓은 함수임!
  // getAccessToken().then((newAccessToken) => {
  //   setAccessToken(newAccessToken ?? "");
  // });

  // [토큰 만료 시 에러 확인하고 리프레시토큰으로 토큰 재발급 받는 로직]

  // 아래에서 GraphQLClient를 import했기 때문에 여기서 mutation요청이 가능한거임
  // 이 mutation은 "2. refreshToken으로 accessToken을 재발급 받기"로 이어짐!
  // const RESTORE_ACCESS_TOKEN = gql`
  //   mutation {
  //     restoreAccessToken {
  //       accessToken
  //     }
  //   }
  // `;

  // const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  //   // graphQLErrors에 여기서 발생한 에러가 들어오고 operation에 요청한 쿼리 내용이 들어감

  //   // 1. 쿼리 요청 시 발생한 에러를 캐치
  //   if (typeof graphQLErrors !== "undefined") {
  //     // 1-2. 아래의 for of 구문은 graphQLErrors에 있는 에러를 하나씩 뽑아서 어떤 에러인지 확인하는 반복문 -> 해당 에러가 토큰 만료 에러(UNAUTHENTICATED)인지 확인
  //     for (const err of graphQLErrors) {
  //       if (err.extensions.code === "UNAUTHENTICATED") {
  //         // async await같은 역할을 아래의 fromPromise가 해준다
  //         // Promise에서 observable로 바꿔주는게 fromPromise!
  //         return fromPromise(
  //           // 2. refreshToken으로 accessToken을 재발급 받기
  //           // (재발급은 자체 백엔드에서 해줘야되는거임)
  //           // restoreAccessToken이라는 함수가 있는데, 아폴로세팅이 적용되기 전이기 때문에 useMutation을 날릴 수가 없음!!
  //           // 그래서 다른 라이브러리(graphql-request)를 활용해야된다 -> GraphQLClient함수를 사용한다

  //           // // ** 리프레시 토큰을 요청해서 토큰을 재발급받고 리코일스테이트에 넣어주는 로직은 재사용가능성이 높으니까 따로 빼준다
  //           // const graphQLClient = new GraphQLClient(
  //           //   "http://backend-practice.codebootcamp.co.kr/graphql",
  //           // );
  //           // const result = await graphQLClient.request(RESTORE_ACCESS_TOKEN);
  //           // // 여기 result에는 재발급 받은 accessToken이 들어감

  //           // const newAccessToken = result.restoreAccessToken.accessToken

  //           // 토큰 재발급 받는 함수를 여기서 써준다
  //           getAccessToken().then((newAccessToken) => {
  //             // 새로 발급받은 액세스 토큰을 글로벌 리코일에 담아준다
  //             setAccessToken(newAccessToken);

  //             // 3. 재발급 받은 accessToken으로 방금 실패한 쿼리 재요청하기

  //             // 쿼리에서 관련 정보를 그대로 가져오는 명령어가 getContext임

  //             // 그 정보를 수정하는게 setContext임
  //             // accessToken을 바꿔치기 할건데, 객체에서 같은 키가 두번 있으면 밑에있는거로 덮어씌워진다는 원리를 이용할 것임
  //             operation.setContext({
  //               headers: {
  //                 // ...operation.getContext().headers를 통해 일단 스프레드를 하고, 그안에 Authorization이라는게 있을텐데 그안에 만료된 토큰이 들어있을거임.  Authorization을 밑에 코드에서 한번더 정의해줌으로써 기존에 만료된 accessToken을 재발급받은 토큰으로 바꿔치기 해준다
  //                 ...operation.getContext().headers,
  //                 Authorization: `Bearer ${newAccessToken}`,
  //               },
  //             });
  //           }),
  //         ).flatMap(() =>
  //           // forward를 통해 아까 실패한 쿼리를 다시 날려준다!!
  //           forward(operation),
  //         );
  //       }
  //     }
  //   }
  // });

  // const uploadLink = createUploadLink({
  //   uri: "https://backend-practice.codebootcamp.co.kr/graphql",
  //   // 백엔드로 요청이 갈때마다 헤더에 accessToken이 담겨서 나간다
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   credentials: "include",
  // });

  const client = new ApolloClient({
    // link: ApolloLink.from([errorLink, uploadLink]),
    cache: GLOBAL_STATE, // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시로 저장해놓기 => 이게 글로벌 스테이트임!!
  });
  // prettier-ignore
  return (
  <ApolloProvider client={client}>
    {props.children}
    {/* props.children 자리에 
        <Layout>
          <Component />
        </Layout>
        가 쏙 들어간다 -> 그러고 다시 ApolloSetting이라는 이름으로 
        전체를 _app.tsx로 땡겨온다 
        
        => 이게바로 "컴포넌트 합성" (composition) */}
  </ApolloProvider>)
}
