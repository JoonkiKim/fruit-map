import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  fromPromise,
  Observable,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import { ApolloLink } from "@apollo/client/link/core";
import { setContext } from "@apollo/client/link/context";

import { createUploadLink } from "apollo-upload-client";

import type React from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  accessTokenState,
  loggedInCheck,
  // restoreAccessTokenLoadable,
} from "../../../../commons/stores";

// import { refreshAccessToken } from "../../../../commons/libraries/refreshAccessTokenFB";
import { auth } from "../../../../commons/libraries/firebase_fruitmap";
import { useEffect } from "react";
import { browserLocalPersistence } from "firebase/auth";

// import { getAccessToken } from "../../../../commons/libraries/getAccessToken";

// 사진, 파일을 업로드하기 위해서는 apollo-upload-client가 필요하다

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [logInCheck, setLogInCheck] = useRecoilState(loggedInCheck);
  // const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);

  // useEffect(() => {
  //   aaa.toPromise().then((newAccessToken) => {
  //     setAccessToken(newAccessToken);
  //   });
  // }, []);

  // 파이어베이스에서는 로컬스토리지에 저장하는 방식으로 로그인 유지

  // Firebase 상태 변화 감지로 로그인 상태 관리
  // 무조건 유지하는게 아니라 인증 상태에 따라 유지 할지 안할지 결정
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLogInCheck(!!user); // 사용자가 있으면 true
    });
    return () => unsubscribe(); // 구독 해제
  }, []);

  const uploadLink = createUploadLink({
    // uri: "https://backend-practice.codebootcamp.co.kr/graphql",
    // 백엔드로 요청이 갈때마다 헤더에 accessToken이 담겨서 나간다
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: GLOBAL_STATE, // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시로 저장해놓기 => 이게 글로벌 스테이트임!!
  });
  // prettier-ignore
  return (
  <ApolloProvider client={client}>
    {props.children}
  </ApolloProvider>)
}
