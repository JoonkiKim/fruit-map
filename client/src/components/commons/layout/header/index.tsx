import styled from "@emotion/styled";
import { useRouter } from "next/router";

import { useRecoilState, useRecoilValueLoadable } from "recoil";
// import {
//   loggedInCheck,
//   restoreAccessTokenLoadable,
// } from "../../../../commons/stores";
import { gql, useQuery } from "@apollo/client";
// import { IQuery } from "../../../../commons/types/generated/types";
import { useEffect } from "react";

// import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: yellow; */
`;

const CompWrapper = styled.div`
  /* background-color: red; */
  width: 1100px;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 236px;
  height: 36px;
  &:hover {
    cursor: pointer;
  }
`;

const BtnWrapper = styled.div``;

const LoginBtn = styled.button`
  width: 92px;
  height: 48px;
  background-color: white;
  border: 0px;
  font-weight: 1000;
  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
`;

const SignUpBtn = styled.button`
  width: 92px;
  height: 48px;
  background-color: #ffd600;
  border: 0px;
  font-weight: 1000;
  border-radius: 10px;
  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
`;

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

export default function LayoutHeader() {
  // const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInCheck);

  // const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);
  // const { data } =
  //   useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  const router = useRouter();
  const onLogoClick = () => {
    router.push(`/boards`);
  };

  const onLogInClick = () => {
    router.push(`/login`);
  };

  const onRegisterClick = () => {
    router.push(`/register`);
  };

  // useEffect(() => {
  //   // 이 새끼때문이었네
  //   if (localStorage.getItem("accessToken") !== null) {
  //     setIsLoggedIn(true);
  //   }

  // useEffect(() => {
  //   aaa.toPromise().then((newAccessToken) => {
  //     if (newAccessToken !== undefined) {
  //       setIsLoggedIn(true);
  //     }
  //   });
  // }, [aaa]);

  return (
    <Wrapper>
      <CompWrapper>
        <Logo src="/images/logo.png" onClick={onLogoClick}></Logo>
        {/* <BtnWrapper>
          {isLoggedIn ? (
            <div>{data?.fetchUserLoggedIn.name}님 환영합니다! </div>
          ) : (
            <>
              <LoginBtn onClick={onLogInClick}>로그인</LoginBtn>
              <SignUpBtn onClick={onRegisterClick}>회원가입</SignUpBtn>
            </>
          )}
        </BtnWrapper> */}
      </CompWrapper>
    </Wrapper>
  );
}
