import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";

export const LoginWrapper = styled.div`
  width: 384px;
  /* background-color: blue; */
  border: none;
`;

export const LoginTitleWrapper = styled.div`
  font-size: 28px;
  font-weight: 700;
  width: 384px;
  text-align: center;
  margin-bottom: 20px;
`;

export const EmailWrapper = styled.div`
  width: 384px;
  margin-bottom: 20px;
`;

export const LoginInput = styled.input`
  width: 384px;
  height: 64px;
  border-radius: 20px;
  padding-left: 10px;
`;

export const LoginErrorMsg = styled.div`
  width: 384px;
  color: red;
  font-size: 16px;
  font-weight: 400;
  margin-left: 20px;
  margin-top: 10px;
`;

export const PasswordWrapper = styled.div`
  width: 384px;
  margin-bottom: 20px;
`;

export const StayLoginWrapper = styled.div`
  width: 384px;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const StayLoginBtn = styled.button`
  margin-right: 10px;
`;

export const StayLoginBtnImg = styled.img`
  width: 20px;
  height: 20px;
`;

export const StayLogintxt = styled.div`
  margin-left: 10px;
  width: 200px;
  font-size: 16px;
`;

export const StayLoginIcon = styled(CheckCircleOutlined)`
  // icon은 텍스트로 인식되기떄문에 font-size로 크기를 조정한다
  margin-left: 10px;
`;

export const StayLoginFilledIcon = styled(CheckCircleFilled)`
  // icon은 텍스트로 인식되기떄문에 font-size로 크기를 조정한다
  margin-left: 10px;
`;

export const LoginBtn = styled.button`
  width: 384px;
  height: 64px;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const NavigatorWrapper = styled.div`
  width: 384px;
  border-top: 1px solid gray;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding-top: 20px;
`;
export const Navigatortxt = styled.div`
  width: 120px;
  height: 60px;
  /* background-color: red; */
  text-align: center;

  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
`;
