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

  // 파이어베이스에서는 로컬스토리지에 저장하는 방식으로 로그인 유지

  // Firebase 상태 변화 감지로 로그인 상태 관리
  // 무조건 유지하는게 아니라 인증 상태에 따라 유지 할지 안할지 결정
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setLogInCheck(!!user); // 사용자가 있으면 true
  //   });
  //   return () => unsubscribe(); // 구독 해제
  // }, [auth]);

  const [, setClientstate] = useState<ApolloClient<any> | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("auth로딩됨" + user);
        const token = await user.getIdToken();
        setAccessToken(token);
        setLogInCheck(true);

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
    cache: GLOBAL_STATE, // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시로 저장해놓기 => 이게 글로벌 스테이트임!!
  });
  // prettier-ignore
  return (
  <ApolloProvider client={client}>
    {props.children}
  </ApolloProvider>)
}
