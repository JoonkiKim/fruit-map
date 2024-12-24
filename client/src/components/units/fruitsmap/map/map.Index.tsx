import Head from "next/head";
import { MouseEvent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  LoadingWrapper,
  MainContentWrapper,
  MapWrapper,
  NewMarketButton,
} from "./map.style";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import {
  auth,
  firebasefruitapp,
} from "../../../../commons/libraries/firebase_fruitmap";
import OverlayContent from "./map.detail";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { loggedInCheck } from "../../../../commons/stores";
import { MarketInfo } from "../register/register.types";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function MapIndexPage() {
  const router = useRouter();

  const [modalMessage, setModalMessage] = useState("");
  const [logInCheck, setLogInCheck] = useRecoilState(loggedInCheck);
  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [marketinfo, setMarketinfo] = useState<MarketInfo[]>([]);

  const onToggleAlertModal = () => {
    setIsModalAlertOpen((prev) => !prev);
  };

  const onClickMoveToDetail = (event: MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget instanceof HTMLDivElement) {
      try {
        router.push(`/fruitsmap/${event.currentTarget.id}`);
      } catch (error) {
        if (error instanceof Error) setModalMessage(error.message);
        onToggleAlertModal();
      }
    }
  };

  useEffect(() => {
    // 특정 경로의 페이지를 미리 가져옵니다.
    router.prefetch("/fruitsmap/new");
  }, [router]);

  const onClickNewMarket = () => {
    router.push("/fruitsmap/new"); // 가게 등록 페이지로 이동
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fruitshop = collection(
          getFirestore(firebasefruitapp),
          "fruitshop"
        );
        const result = await getDocs(fruitshop);

        // 기존 데이터에 문서 ID를 추가한 배열 생성
        const marketinfoData: MarketInfo[] = result.docs.map((el) => ({
          ...(el.data() as MarketInfo),
          documentId: el.id,
        }));

        setMarketinfo(marketinfoData);
        return marketinfoData;
      } catch (error) {
        console.error("Error fetching market data:", error);
        return [];
      }
    };

    const initializeMap = async () => {
      const marketinfoData = await fetchData();

      const latestPosition = marketinfoData.reduce((latest, current) => {
        const latestDate = latest.createdAt?.toDate() || new Date(0);
        const currentDate = current.createdAt?.toDate() || new Date(0);
        return currentDate > latestDate ? current : latest;
      }, marketinfoData[0]);

      const script = document.createElement("script");
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1959f4231719c25f68b4c5b5443d7c37&libraries=services";
      document.head.appendChild(script);

      script.onload = () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(
              latestPosition?.lat || 37.498822636271,
              latestPosition?.lng || 126.928393911783
            ),
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);

          const overlays: any[] = [];
          const closeAllOverlays = () =>
            overlays.forEach((overlay) => overlay.setMap(null));

          marketinfoData.forEach((position) => {
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(
                position.lat,
                position.lng
              ),
            });
            marker.setMap(map);

            const overlayDiv = document.createElement("div");
            const customOverlay = new window.kakao.maps.CustomOverlay({
              position: marker.getPosition(),
              content: overlayDiv,
              yAnchor: 1.3,
              clickable: true,
            });
            // eslint-disable-next-line react/no-deprecated
            ReactDOM.render(
              <OverlayContent
                position={position}
                onClose={() => customOverlay.setMap(null)}
                onClickMoveToDetail={onClickMoveToDetail}
              />,
              overlayDiv
            );

            overlays.push(customOverlay);

            window.kakao.maps.event.addListener(marker, "click", () => {
              closeAllOverlays();
              customOverlay.setMap(map);
            });
          });

          window.kakao.maps.event.addListener(map, "click", closeAllOverlays);
        });

        setLoading(false); // 로딩 완료
      };
    };

    initializeMap();
  }, [router.query]);

  console.log(loading);

  return (
    <div>
      <Head>
        <link rel="prefetch" href="./" />
        <link
          rel="preload"
          href="https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1959f4231719c25f68b4c5b5443d7c37&libraries=services"
          as="script"
        />
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
        ></script>

        <meta property="og:title" content="과일가게 지도" />
        <meta
          property="og:description"
          content="과일가게의 위치를 알려주는 지도입니다"
        />
        <meta property="og:image" content="" />
      </Head>

      <MainContentWrapper>
        {/* {loading ? ( // 로딩 중일 때 메시지 표시
          <LoadingWrapper>로딩중...</LoadingWrapper>
        ) : ( */}
        <>
          <MapWrapper id="map"></MapWrapper>
          {logInCheck && (
            <NewMarketButton onClick={onClickNewMarket}>
              가게 등록하기
            </NewMarketButton>
          )}
        </>
      </MainContentWrapper>
    </div>
  );
}
