import styled from "@emotion/styled";
import { Modal } from "antd";

export const MainContentWrapper = styled.div`
  position: relative;
  width: 100vw; /* 브라우저 너비 전체 */
  height: 85vh;
  /* border: 1px solid black; */
`;

export const MapWrapper = styled.div`
  width: 100%; /* 브라우저 너비 전체 */
  height: 100%;
  /* border: 1px solid black; */
`;

export const LoadingWrapper = styled.div`
  width: 100%; /* 브라우저 너비 전체 */
  height: 100%;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InfoBox = styled.div`
  width: 200px;
  height: 80px;
  padding: 5px;
  background-color: white;
  display: flex;
  flex-direction: row;
`;

export const InfoContentWrapper = styled.div``;
export const InfoTitle = styled.div`
  color: black;
  font-size: 30px;
  font-weight: 500;
`;

export const InfoAddress = styled.div`
  color: black;
  font-size: 20px;
`;

export const CloseButton = styled.div`
  color: gray;
  font-size: 20px;
`;

export const RecommendWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 5%;

  border-bottom: 1px solid #d3d3d3;
  /* background-color: red; */
  &:hover {
    cursor: pointer;
  }
`;

export const NewMarketButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #ff5733;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  z-index: 100;
  cursor: pointer;
  &:hover {
    background-color: #c70039;
  }
`;

export const ModalAlert = styled(Modal)``;
