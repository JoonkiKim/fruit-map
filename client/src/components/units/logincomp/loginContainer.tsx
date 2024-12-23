import {
  EmailWrapper,
  LoginBtn,
  LoginErrorMsg,
  LoginInput,
  LoginTitleWrapper,
  LoginWrapper,
  Navigatortxt,
  NavigatorWrapper,
  PasswordWrapper,
  StayLoginFilledIcon,
  StayLoginIcon,
  StayLogintxt,
  StayLoginWrapper,
} from "./loginStyles";

import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../commons/libraries/firebase_fruitmap";
import { loggedInCheck } from "../../../commons/stores";
import { useEffect, useState } from "react";
import { wrapFormAsync } from "../../../commons/libraries/asyncFunc";

const schema = yup.object({
  email: yup
    .string()
    .email("이메일 형식에 적합하지 않습니다")
    .required("이메일은 필수입력입니다."),

  password: yup
    .string()
    .min(6, "비밀번호는 최소 6자리 이상 입력해주세요")
    .max(15, "비밀번호는 최대 15자리로 입력해주세요")
    .required("비밀번호는 필수 입력입니다. "),
});

type IFormData = yup.InferType<typeof schema>;

export default function LoginContainer() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [, setIsLoggedIn] = useRecoilState(loggedInCheck);
  const [stayLoggedIn, setStayLoggedIn] = useState(false); // 로그인 상태 유지 여부
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  // "로그인 상태 유지" 클릭 이벤트
  const toggleStayLoggedIn = () => {
    setStayLoggedIn((prev) => !prev);
  };

  useEffect(() => {
    // 특정 경로의 페이지를 미리 가져옵니다.
    router.prefetch("/fruitsmap");
    router.prefetch("/signUp");
  }, [router]);

  const onClickLogin = async (data: IFormData) => {
    try {
      setLoading(true); // 로딩 상태 시작
      const persistence = stayLoggedIn
        ? browserLocalPersistence // 브라우저 닫아도 유지
        : browserSessionPersistence; // 브라우저 닫으면 로그아웃

      await setPersistence(auth, persistence);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const token = await userCredential.user.getIdToken();
      // setAccessToken(token); // Recoil 상태에 저장

      setIsLoggedIn(true);
      alert("로그인 성공!");

      if (!router.isReady) {
        console.warn("라우터가 준비되지 않았습니다. 대기 중...");
        await new Promise((resolve) => setTimeout(resolve, 500)); // 라우터 준비 대기
      }

      await router.push("/fruitsmap");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  const moveToRegister = async () => {
    try {
      if (!router.isReady) {
        console.warn("라우터가 준비되지 않았습니다. 대기 중...");
        await new Promise((resolve) => setTimeout(resolve, 500)); // 라우터 준비 대기
      }

      await router.push("/signUp");
    } catch (error) {
      console.error("회원가입 페이지로 이동 중 에러 발생:", error);
    }
  };

  return (
    <>
      <form onSubmit={wrapFormAsync(handleSubmit(onClickLogin))}>
        <LoginWrapper>
          <LoginTitleWrapper>로그인</LoginTitleWrapper>
          <EmailWrapper>
            <LoginInput
              type="email"
              {...register("email")}
              placeholder="이메일을 입력해주세요"
            />
            <LoginErrorMsg>{formState.errors.email?.message}</LoginErrorMsg>
          </EmailWrapper>
          <PasswordWrapper>
            <LoginInput
              type="password"
              {...register("password")}
              placeholder="비밀번호를 입력해주세요"
            />
            <LoginErrorMsg>{formState.errors.password?.message}</LoginErrorMsg>
          </PasswordWrapper>

          <StayLoginWrapper>
            {stayLoggedIn ? (
              <StayLoginFilledIcon onClick={toggleStayLoggedIn} />
            ) : (
              <StayLoginIcon onClick={toggleStayLoggedIn} />
            )}
            <StayLogintxt>로그인 상태 유지</StayLogintxt>
          </StayLoginWrapper>
          <LoginBtn type="submit" disabled={loading}>
            {loading ? "로그인 중..." : "로그인 하기"}
          </LoginBtn>
          <NavigatorWrapper>
            <Navigatortxt onClick={moveToRegister}>회원가입</Navigatortxt>
          </NavigatorWrapper>
        </LoginWrapper>
      </form>
    </>
  );
}
