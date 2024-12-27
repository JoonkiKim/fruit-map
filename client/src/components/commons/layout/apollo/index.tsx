import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { ApolloLink } from "@apollo/client/link/core";

import { createUploadLink } from "apollo-upload-client";

import { setContext } from "@apollo/client/link/context";
import type React from "react";
import { useRecoilState } from "recoil";
import { accessTokenState, loggedInCheck } from "../../../../commons/stores";

import { auth } from "../../../../commons/libraries/firebase_fruitmap";
import { useEffect, useState } from "react";

// 사진, 파일을 업로드하기 위해서는 apollo-upload-client가 필요하다

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const [logInCheck, setLogInCheck] = useRecoilState(loggedInCheck);

  // 기본값 설정: Firebase 인증 상태 확인 후 AccessToken 초기화
  // 이부분에서 액세스 토큰 초기화 및 분기처리를 해준다
  // useEffect(() => {
  //   const initializeAccessToken = async () => {
  //     try {
  //       const user = auth?.currentUser;
  //       if (user) {
  //         const token = await user.getIdToken();

  //         setAccessToken(token);
  //         setLogInCheck(true);
  //         console.log("아폴로세팅에서 전함 - 로그인 되어있음");
  //       } else {
  //         setAccessToken(""); // 기본값
  //         setLogInCheck(false);

  //         console.log("아폴로세팅에서 전함 - user없음");
  //         console.log("accessToken값은" + accessToken);
  //         console.log("logincheck값은" + accessToken);
  //       }
  //     } catch (error) {
  //       console.error("Failed to initialize accessToken:", error);
  //       setAccessToken(""); // 기본값으로 초기화
  //     }
  //   };

  //   initializeAccessToken();
  // }, [setAccessToken, setLogInCheck]);

  const [, setClientstate] = useState<ApolloClient<any> | null>(null);

  // 이부분에서 로그인 유지를 해준다
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // console.log("authlink uploadlink의 헤더 기본값 없애보기 테스트입니다");
        console.log("auth로딩됨" + JSON.stringify(user));
        const token = await user.getIdToken();
        setAccessToken(token);
        setLogInCheck(true);
        console.log(logInCheck + "다시 로그인 됨");
        if (accessToken) {
          console.log("토큰 다시 생성됨");
        }
        // 여기는 Apollo Client 동적 생성을 잘 해준 코드 -> 다시 복구해줘야됨
        const newClient = new ApolloClient({
          link: ApolloLink.from([
            setContext(() => ({
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })),
            uploadLink,
          ]),
          cache: new InMemoryCache(),
        });

        setClientstate(newClient); // Apollo Client 동적 생성
      }
    });

    return () => unsubscribe();
  }, []);
  // logInCheck, accessToken가 변경되면 auth를 무사히 불러오기 때문에 가능했을것이다

  // 초기화를 잘 해준 코드드
  const uploadLink = createUploadLink({
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    credentials: "include",
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await auth.currentUser?.getIdToken(); // Firebase에서 최신 토큰 가져오기
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: ApolloLink.from([authLink, uploadLink]),

    cache: GLOBAL_STATE,
    // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시로 저장해놓기 => 이게 글로벌 스테이트임!!
  });
  // prettier-ignore
  return (
  <ApolloProvider client={client}>
    {props.children}
  </ApolloProvider>)
}
