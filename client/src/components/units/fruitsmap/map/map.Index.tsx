import Head from "next/head";
import Link from "next/link";
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
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInCheck);
  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [marketinfo, setMarketinfo] = useState<MarketInfo[]>([]);

  const onToggleAlertModal = () => {
    setIsModalAlertOpen((prev) => !prev);
  };

  // 문제가 생긴 코드드
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

  // 이게 진짜 코드
  // const onClickMoveToDetail = (event: MouseEvent<HTMLDivElement>) => {
  //   if (event.currentTarget instanceof HTMLDivElement) {
  //     try {
  //       if (!event.currentTarget.id)
  //         throw new Error("상세 페이지로 이동할 수 없습니다.");

  //       router.push(`/fruitsmap/${event.currentTarget.id}`);
  //     } catch (error) {
  //       if (error instanceof Error) setModalMessage(error.message);
  //       onToggleAlertModal();
  //     }
  //   }
  // };

  useEffect(() => {
    // 비동기 작업 완료 후 상태 업데이트
    const checkLogin = async () => {
      try {
        const user = await auth.currentUser; // Firebase 현재 사용자 가져오기
        setIsLoggedIn(!!user); // 사용자 존재 여부를 상태로 설정
      } catch (error) {
        console.error("Error checking login state:", error);
      }
    };

    checkLogin();
  }, [setIsLoggedIn]);

  // useEffect(() => {
  //   // 특정 경로의 페이지를 미리 가져옵니다.
  //   router.prefetch("/fruitsmap/new");
  // }, [router]);

  // const onClickNewMarket = () => {
  //   router.push("/fruitsmap/new"); // 가게 등록 페이지로 이동
  // };

  const user = auth?.currentUser;
  console.log("로그인 여부는" + isLoggedIn);

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

    const initializeMap = async (retryCount = 3, delay = 100) => {
      const marketinfoData = await fetchData();

      const latestPosition = marketinfoData.reduce((latest, current) => {
        const latestDate = latest.createdAt?.toDate() || new Date(0);
        const currentDate = current.createdAt?.toDate() || new Date(0);
        return currentDate > latestDate ? current : latest;
      }, marketinfoData[0]);

      const script = document.createElement("script");
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1959f4231719c25f68b4c5b5443d7c37&libraries=services";
      script.async = true;

      document.head.appendChild(script);
      script.onload = () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          if (!container) {
            console.error("Map container not found. Retrying...");
            if (retryCount > 0) {
              setTimeout(() => initializeMap(retryCount - 1, delay), delay);
            } else {
              alert("지도를 불러오지 못했습니다. 페이지를 새로고침 해주세요.");
            }
            return;
          }
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

    initializeMap().catch((error) => {
      console.error("Error initializing map:", error);
    });
  }, [router.query]);

  console.log("로딩중 :" + loading);

  return (
    <div>
      <Head>
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
        <>
          {loading ? (
            <LoadingWrapper>로딩중...</LoadingWrapper>
          ) : (
            <>
              <MapWrapper id="map"></MapWrapper>
              {isLoggedIn && (
                <Link href="/fruitsmap/new" passHref>
                  <NewMarketButton as="a">가게 등록하기</NewMarketButton>
                </Link>
              )}
            </>
          )}
        </>
      </MainContentWrapper>
    </div>
  );
}
