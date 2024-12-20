import React, { MouseEvent } from "react";

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
    Array.isArray(position.imageurl) && position.imageurl[0]
      ? position.imageurl[0]
      : "/images/fruit.png";

  return (
    <div
      style={{
        padding: "10px",
        background: "white",
        border: "1px solid #ccc",
        position: "relative",
        width: "220px",
      }}
    >
      <img
        src={imageUrl}
        alt="가게 이미지"
        style={{ width: "20px", height: "20px" }}
      />
      <div>{position.name}</div>
      <div style={{ fontSize: "14px", marginTop: "5px" }}>{position.menu}</div>
      <div style={{ fontSize: "12px", marginTop: "5px" }}>
        {position.marketaddress}
      </div>
      <button
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
      </button>
      <div id={position.documentId} onClick={onClickMoveToDetail}>
        상세 페이지로 이동
      </div>
    </div>
  );
}
