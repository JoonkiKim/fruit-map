import styled from "@emotion/styled";
import { Modal } from "antd";
export const Wrapper = styled.div`
  margin-top: 50px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: yellow; */
`;

export const LogOutWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #dbdbdb;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;

export const ModalAlert = styled(Modal)``;
