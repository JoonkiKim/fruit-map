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
  text-decoration-line: none;
  cursor: pointer;
  &:hover {
    background-color: #c70039;
  }
`;

export const ModalAlert = styled(Modal)``;

export const OverlayWrapper = styled.div`
  padding: 10px;
  background: white;
  border: 1px solid #ccc;
  position: relative;
  width: 220px;
`;

export const OverlayImg = styled.img`
  width: 20px;
  height: 20px;
`;

export const MarketName = styled.div``;

export const MarketMenu = styled.div`
  font-size: 14px;
  margin-top: 5px;
`;

export const MarketAddress = styled.div`
  font-size: 12px;
  margin-top: 5px;
`;

export const OverlayCloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 5px;
  color: gray;
  border: none;
  cursor: pointer;
`;

export const OverlayMoveToDetail = styled.div``;
