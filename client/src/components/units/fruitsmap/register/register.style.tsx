import styled from "@emotion/styled";
import { TimePicker } from "antd";

export const MainContentWrapper = styled.div`
  /* width: 100vw; 브라우저 너비 전체 */

  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid black; */
`;

export const FormWrapper = styled.div`
  /* margin-top: 50px; */
  width: 450px; /* 브라우저 너비 전체 */

  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
  /* border: 1px solid black; */
`;

export const FruitsMarketWrapper = styled.div`
  margin-bottom: 10px;
  /* background-color: blue; */
`;

export const FruitsInput = styled.input`
  margin-top: 10px;
  margin-bottom: 20px;

  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #bdbdbd;
  &::placeholder {
    color: #bdbdbd; /* 원하는 색상으로 변경 */
    font-size: 16px; /* 원하는 크기로 변경 */
    padding-left: 5px;
  }
  /* border: 1px solid black; */
`;

export const FruitsNormalDiv = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;

  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #bdbdbd;

  /* border: 1px solid black; */
`;

export const FruitsCaptionWrapper = styled.div`
  width: 300px;
  /* background-color: blue; */
`;

export const RegisterButton = styled.button`
  width: 300px;
  height: 52px;
  background-color: orange;
  border-radius: 5px;
  border: 0px;
  color: black;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 50px;
  &:hover {
    cursor: pointer;
  }
`;

export const AdressWrapper = styled.div`
  width: 300px;
`;

export const PostCodeInput = styled.input`
  width: 77px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #bdbdbd;

  &::placeholder {
    color: #bdbdbd; /* 원하는 색상으로 변경 */
    font-size: 16px; /* 원하는 크기로 변경 */
    padding-left: 5px;
  }
`;

export const FirstLineWrapper = styled.div`
  width: 220px;
  /* background-color: red; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const PostSearchButton = styled.button`
  background-color: black;
  width: 90px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #bdbdbd;
  color: white;
  font-size: 12px;
  margin-right: 30px;
  // Q. 버튼 정렬하는 방식 찾아보기
`;

export const AdressInputWrapper = styled.div`
  width: 300px;
  /* background-color: red; */
`;

export const AdressInput = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #bdbdbd;
  /* margin-top: 10px; */
  margin-bottom: 20px;
`;

export const ErMes = styled.div`
  color: red;
  font-size: 16px;
`;

export const ImageWrapper = styled.div`
  width: 300px;
  display: flex;
  flex: row;
  margin-top: 10px;
  margin-bottom: 20px;

  /* background-color: blue; */
  justify-content: space-between;
`;

export const LogoImg = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export const LogoTxt = styled.div`
  width: 90%;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: red; */
  justify-content: left;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const FruitsTimePicker = styled(TimePicker.RangePicker)`
  width: 300px;
  height: 30px;

  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;

  .ant-picker-input {
    color: #555;
    font-size: 16px;
  }

  &:hover {
    border-color: #1890ff; /* 호버 시 테두리 색상 */
  }
`;
