import { useEffect, useState } from "react";
import {
  RegisterBtn,
  RegisterDivWrapper,
  RegisterErrorMsg,
  RegisterInput,
  RegisterInputTitle,
  RegisterTitle,
  RegisterWrapper,
} from "./RegisterStyles";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { useRouter } from "next/router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { wrapFormAsync } from "../../../commons/libraries/asyncFunc";
import { ModalAlert } from "../fruitsmap/map/map.style";
import { auth } from "../../../commons/libraries/firebase_fruitmap";

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

  name: yup.string().required("이름은 필수입력입니다"),

  // 비밀번호 검증은 passwordConfirm으로 한다
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다")
    .required("비밀번호는 필수입력입니다."),
});

type IRegisterData = yup.InferType<typeof schema>;

export default function SignUpContainer() {
  const { register, handleSubmit, formState } = useForm<IRegisterData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const marketId = router.query.id;
    }
  }, [router.isReady, router.query.id]);

  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const onToggleAlertModal = () => {
    setIsModalAlertOpen((prev) => !prev);
  };

  const onClickSignUp = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(userCredential.user, {
        displayName: data.name,
      });
      console.log(auth.currentUser);
      alert("회원가입 성공!");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    router.prefetch("/login");
  }, [router]);
  const moveToLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <RegisterWrapper>
        {/* <form onSubmit={handleSubmit(onClickSignUp)}> */}
        <form onSubmit={wrapFormAsync(handleSubmit(onClickSignUp))}>
          <RegisterTitle>회원가입</RegisterTitle>
          <RegisterDivWrapper>
            <RegisterInputTitle>이메일</RegisterInputTitle>
            <RegisterInput
              type="text"
              {...register("email")}
              placeholder="이메일을 입력해주세요"
            />
            <RegisterErrorMsg>
              {formState.errors.email?.message}
            </RegisterErrorMsg>
          </RegisterDivWrapper>
          <RegisterDivWrapper>
            <RegisterInputTitle>이름</RegisterInputTitle>
            <RegisterInput
              type="text"
              {...register("name")}
              placeholder="이름을 입력해주세요"
            />
            <RegisterErrorMsg>
              {formState.errors.name?.message}
            </RegisterErrorMsg>
          </RegisterDivWrapper>
          <RegisterDivWrapper>
            <RegisterInputTitle>비밀번호</RegisterInputTitle>
            <RegisterInput
              type="password"
              {...register("password")}
              placeholder="비밀번호를 입력해주세요"
            />
            <RegisterErrorMsg>
              {formState.errors.password?.message}
            </RegisterErrorMsg>
          </RegisterDivWrapper>
          <RegisterDivWrapper>
            <RegisterInputTitle> 비밀번호 확인 </RegisterInputTitle>

            <RegisterInput
              type="password"
              {...register("passwordConfirm")}
              placeholder="비밀번호를 입력해주세요"
            />
            <RegisterErrorMsg>
              {formState.errors.passwordConfirm?.message}
            </RegisterErrorMsg>
          </RegisterDivWrapper>
          <RegisterBtn type="submit">회원가입하기</RegisterBtn>
        </form>
      </RegisterWrapper>

      <ModalAlert
        open={isModalAlertOpen}
        onOk={moveToLogin}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <span>{modalMessage}</span>
      </ModalAlert>
    </>
  );
}
