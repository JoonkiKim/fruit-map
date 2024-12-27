import React, { MouseEvent } from "react";
import {
  MarketAddress,
  MarketMenu,
  MarketName,
  OverlayCloseBtn,
  OverlayImg,
  OverlayMoveToDetail,
  OverlayWrapper,
} from "./map.style";

interface OverlayContentProps {
  position: any;
  onClose: () => void;
  onClickMoveToDetail: (event: MouseEvent<HTMLDivElement>) => void;
}

export default function OverlayContent({
  position,
  onClose,
  onClickMoveToDetail,
}: OverlayContentProps) {
  const imageUrl =
    Array.isArray(position.imageUrl) && position.imageUrl[0]
      ? position.imageUrl[0]
      : "/images/fruit.png";

  return (
    <OverlayWrapper>
      <OverlayImg
        src={imageUrl}
        alt="가게 이미지"
        style={{ width: "20px", height: "20px" }}
      />
      <MarketName>{position.name}</MarketName>
      <MarketMenu style={{ fontSize: "14px", marginTop: "5px" }}>
        {position.menu}
      </MarketMenu>
      <MarketAddress style={{ fontSize: "12px", marginTop: "5px" }}>
        {position.marketaddress}
      </MarketAddress>
      <OverlayCloseBtn
        style={{
          position: "absolute",
          top: "10px",
          right: "5px",
          color: "gray",
          border: "none",
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        X
      </OverlayCloseBtn>
      <OverlayMoveToDetail
        id={position.documentId}
        onClick={onClickMoveToDetail}
      >
        상세 페이지로 이동
      </OverlayMoveToDetail>
    </OverlayWrapper>
  );
}
