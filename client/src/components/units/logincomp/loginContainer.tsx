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
import useRouter from "next/router";
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
import { wrapFormAsync } from "../../../commons/libraries/asyncFunc";
import { accessTokenState, loggedInCheck } from "../../../commons/stores";
import { useState } from "react";

export const schema = yup.object({
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
  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const router = useRouter();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const [, setIsLoggedIn] = useRecoilState(loggedInCheck);
  const [stayLoggedIn, setStayLoggedIn] = useState(false); // 로그인 상태 유지 여부

  // "로그인 상태 유지" 클릭 이벤트
  const toggleStayLoggedIn = () => {
    setStayLoggedIn((prev) => !prev);
  };

  const onClickLogin = async (data) => {
    try {
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
      setAccessToken(token); // Recoil 상태에 저장

      setIsLoggedIn(true);
      alert("로그인 성공!");
      router.push(`/fruitsmap`);
    } catch (error) {
      alert(error.message);
    }
  };

  const moveToRegister = () => {
    router.push("/signUp");
  };

  return (
    <>
      {/* form을 로그인, 회원가입에 사용할때는 onSubmit을 쓰자 */}
      <form onSubmit={wrapFormAsync(handleSubmit(onClickLogin))}>
        <LoginWrapper>
          <LoginTitleWrapper>로그인</LoginTitleWrapper>
          <EmailWrapper>
            <LoginInput
              type="email"
              {...register("email")}
              placeholder="이메일을 입력해주세요"
            />{" "}
            <LoginErrorMsg>{formState.errors.email?.message}</LoginErrorMsg>
          </EmailWrapper>
          <PasswordWrapper>
            <LoginInput
              type="password"
              {...register("password")}
              placeholder="비밀번호를 입력해주세요"
            />{" "}
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
          <LoginBtn type="submit">로그인 하기</LoginBtn>
          <NavigatorWrapper>
            <Navigatortxt onClick={moveToRegister}>회원가입</Navigatortxt>
          </NavigatorWrapper>
        </LoginWrapper>
      </form>
    </>
  );
}
