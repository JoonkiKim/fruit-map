import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
import { db } from "../../../../commons/libraries/firebase_fruitmap";
import * as D from "./FruitsDetail.style";
import { MarketInfo } from "../register/register.types";

export default function FruitsDetailContainerPage() {
  const router = useRouter();

  const id = String(router.query.marketId);

  const [marketData, setMarketData] = useState(undefined);

  useEffect(() => {
    if (!id) return;
    console.log("Router ID:", id);

    const fetchMarketData = async () => {
      try {
        const fruitDocRef = doc(db, "fruitshop", id); // 문서 참조
        const fruitDoc = await getDoc(fruitDocRef); // 문서 가져오기

        if (fruitDoc.exists()) {
          const data = fruitDoc.data(); // 문서 데이터
          console.log("id 필드 값:", data.id); // id 필드 출력
          console.log("전체 데이터:", data); // 전체 문서 데이터 출력

          setMarketData({ ...data }); // 필요 시 상태 업데이트
        } else {
          console.error("문서가 존재하지 않습니다.");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("문서 데이터 가져오기 실패:", error.message);
        }
      }
    };

    fetchMarketData();
  }, [id]);

  const moveToEdit = () => {
    router.push(`/fruitsmap/${router.query.marketId}/edit`);
  };

  return (
    <D.DetailWrapper>
      <D.Title>{marketData?.name}</D.Title>
      <D.InfoSection>
        <p>
          <strong>주소:</strong> {marketData?.marketaddress}
        </p>
        <p>
          <strong>메뉴:</strong> {marketData?.menu}
        </p>
        <p>
          <strong>이미지:</strong> <br />
          {Array.isArray(marketData?.imageUrl) &&
          marketData?.imageUrl.length > 0 ? (
            <img
              src={marketData?.imageUrl[0]}
              alt="가게 이미지"
              style={{ width: "300px", height: "200px", objectFit: "cover" }}
            />
          ) : (
            <img
              src="/images/fruit.png"
              alt="기본 이미지"
              style={{ width: "300px", height: "200px", objectFit: "cover" }}
            />
          )}
        </p>
        <p>
          <strong>링크:</strong>{" "}
          <a href={marketData?.link} target="_blank" rel="noopener noreferrer">
            가게 방문하기
          </a>
        </p>
        <button onClick={moveToEdit}>내 가게 정보 수정하기</button>
      </D.InfoSection>
    </D.DetailWrapper>
  );
}
