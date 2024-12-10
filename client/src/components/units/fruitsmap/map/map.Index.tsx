import Head from "next/head";
import { useEffect, useRef } from "react";
import { MapWrapper } from "./map.style";

import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { firebasefruitapp } from "../../../../commons/libraries/firebase_fruitmap";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function MapIndexPage() {
  // 서버사이드 렌더링 방지를 위해 useEffect로 실행
  useEffect(() => {
    const initializeMap = async () => {
      // Firebase 데이터 가져오기
      const fruitshop = collection(getFirestore(firebasefruitapp), "fruitshop");
      const result = await getDocs(fruitshop);
      const marketinfo = result.docs.map((el) => el.data());

      // 카카오 맵 스크립트 로드
      const script = document.createElement("script");
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1959f4231719c25f68b4c5b5443d7c37&libraries=services";
      document.head.appendChild(script);

      script.onload = () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(37.48014, 126.94588),
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);

          const overlays = []; // 오버레이를 관리하는 배열

          // 모든 오버레이 닫기 함수
          const closeAllOverlays = () => {
            overlays.forEach((overlay) => overlay.setMap(null));
          };

          // 마커 및 오버레이 추가
          marketinfo.forEach((position) => {
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(
                position.lat,
                position.lng
              ),
            });
            marker.setMap(map);
            const overlayContent = document.createElement("div");
            overlayContent.innerHTML = `
              <div style="padding: 10px; background: white; border: 1px solid #ccc; position: relative;">
                <div>
                <a href=${position.link} target="_blank"  style="font-size: 16px; font-weight: bold; text-decoration-line: none">
                ${position.name}
               </a>
                </div>
                <div style="font-size: 14px; margin-top: 5px;">${position.menu}</div>
                <div style="font-size: 12px; margin-top: 5px;">${position.address}</div>
                
                <button style="position: absolute; top: 10px; right: 5px; color: #gray; border: none; cursor: pointer;" class="close-overlay-btn">X</button>
              </div>
            `;
            overlayContent.style.width = "220px";
            overlayContent.style.height = "150px";

            const customOverlay = new window.kakao.maps.CustomOverlay({
              clickable: true,
              position: marker.getPosition(),
              content: overlayContent,
              yAnchor: 1,
            });

            overlays.push(customOverlay);

            // `X` 버튼 클릭 이벤트 추가
            overlayContent
              .querySelector(".close-overlay-btn")
              ?.addEventListener("click", () => {
                customOverlay.setMap(null);
              });

            // 마커 클릭 이벤트
            window.kakao.maps.event.addListener(marker, "click", () => {
              closeAllOverlays(); // 기존 오버레이 닫기
              customOverlay.setMap(map); // 현재 오버레이 열기
            });
          });

          // 지도 클릭 시 모든 오버레이 닫기
          window.kakao.maps.event.addListener(map, "click", closeAllOverlays);
        });
      };
    };

    initializeMap();
  }, []);

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

      <MapWrapper id="map"></MapWrapper>
    </div>
  );
}
