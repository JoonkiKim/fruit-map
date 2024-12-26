import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { ApolloLink } from "@apollo/client/link/core";

import { createUploadLink } from "apollo-upload-client";

import { setContext } from "@apollo/client/link/context";
import type React from "react";
import { useRecoilState } from "recoil";
import { accessTokenState, loggedInCheck } from "../../../../commons/stores";

import { auth } from "../../../../commons/libraries/firebase_fruitmap";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// 사진, 파일을 업로드하기 위해서는 apollo-upload-client가 필요하다

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps) {
  // const router = useRouter();

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const [logInCheck, setLogInCheck] = useRecoilState(loggedInCheck);
  // 기본값 설정: Firebase 인증 상태 확인 후 AccessToken 초기화
  useEffect(() => {
    const initializeAccessToken = async () => {
      try {
        const user = auth?.currentUser;
        if (user) {
          const token = await user.getIdToken();

          setAccessToken(token);
          setLogInCheck(true);
          console.log("아폴로세팅에서 전함 - 로그인 되어있음");
        } else {
          setAccessToken(""); // 기본값
          setLogInCheck(false);

          console.log("아폴로세팅에서 전함 - user없음");
        }
      } catch (error) {
        console.error("Failed to initialize accessToken:", error);
        setAccessToken(""); // 기본값으로 초기화
      }
    };

    initializeAccessToken();
  }, [setAccessToken, setLogInCheck]);

  // 파이어베이스에서는 로컬스토리지에 저장하는 방식으로 로그인 유지

  // Firebase 상태 변화 감지로 로그인 상태 관리
  // 무조건 유지하는게 아니라 인증 상태에 따라 유지 할지 안할지 결정
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setLogInCheck(!!user); // 사용자가 있으면 true
  //   });
  //   return () => unsubscribe(); // 구독 해제
  // }, [auth]);

  // 페이지 주소 변경 감지 및 새로고침 처리
  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     window.location.reload();
  //   };

  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  const [, setClientstate] = useState<ApolloClient<any> | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("auth로딩됨" + user);
        const token = await user.getIdToken();
        setAccessToken(token);
        setLogInCheck(true);
        console.log(logInCheck + "다시 로그인 됨");
        if (accessToken) {
          console.log("토큰 다시 생성됨");
        }
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
  }, [logInCheck, accessToken]);

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
