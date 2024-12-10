// // 원본코드!

// // 로그인체크에도 제네릭 타입을 적용해보자~ (useAuth)

// import { useRouter } from "next/router";
// import { ComponentType, ReactElement, useEffect } from "react";
// import { useRecoilValueLoadable } from "recoil";

// export const 로그인체크 =
//   (컴포넌트: ComponentType) =>
//   <P extends {}>(프롭스: P): ReactElement<P> => {
//     const router = useRouter();
//     const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);

//     // 1. 로그인체크 (리프레시 토큰 이전 방식)
//     // useEffect(() => {
//     //   const token = localStorage.getItem("accessToken");

//     //   if (token === null) {
//     //     alert("로그인 후 이용가능합니다");
//     //     router.push("/login");
//     //     // return;
//     //   }
//     // const decodedToken = decodeJWT(token);

//     // if (decodedToken && decodedToken.exp * 1000 < Date.now()) { // 만료 시간 체크 (ms로 변환)
//     //   alert("다시 로그인 해주세요.");
//     //   localStorage.removeItem("accessToken"); // 만료된 토큰 삭제
//     //   router.push("/login");
//     // }

//     // 2. 로그인체크 (리프레시 토큰 이후 방식)
//     // 아폴로세팅에서도 동일한 요청을 할거기때문에 이렇게 하면 요청이 두번 들어가서 안좋다!
//     //   useEffect(() => {
//     //     getAccessToken().then((newAccessToken) => {

//     //       if(newAccessToken === undefined) {
//     //         alert("로그인 후 이용가능합니다");
//     //      router.push("/login");
//     //       }
//     //     });
//     // }, []);

//     // 3. 로그인체크 (리프레시 토큰 이후 방식 + 전역함수를 사용하기 )
//     // 따라서 여기서도 전역으로 받아온 데이터를 활용한다
//     // 함수를 공유해서 쓰니까 아폴로세팅과 로그인체크 둘다 "한번만" 요청하게 된다!!
//     useEffect(() => {
//       aaa.toPromise().then((newAccessToken) => {
//         if (newAccessToken === undefined) {
//           alert("로그인 후 이용가능합니다 (로그인 체크 에러)");
//           router.push("/login");
//         }
//       });
//     }, []);
//     // useEffect(() => {
//     //   if (aaa.state === "loading") return; // 아직 로딩 중이면 이후 코드 실행 중단

//     //   aaa.toPromise().then((newAccessToken) => {
//     //     if (newAccessToken === undefined) {
//     //       alert("로그인 후 이용가능합니다 (로그인 체크 에러)");
//     //       router.push("/login");
//     //     }
//     //   });
//     // }, [aaa.state]);

//     return <컴포넌트 {...프롭스} />;
//   };

// // 로그인체크 컴포넌트 안으로 마이페이지 와 같이 내가 로그인 검사를 하고 싶은 컴포넌트가 들어오는데 그거는 '컴포넌트'라는 인자로 받고 프롭스는 '프롭스'라는 인자로 받음
// // 아래에서 그러면서 아래에서 활용할 수 있게 되는거임

// // 여기부터 임시코드

// // JWT 디코딩 함수
// // const decodeJWT = (token: string) => {
// //   try {
// //     const base64Url = token.split(".")[1]; // payload 부분 추출
// //     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Base64 형식으로 변환
// //     const jsonPayload = decodeURIComponent(
// //       atob(base64)
// //         .split("")
// //         .map(function (c) {
// //           return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
// //         })
// //         .join(""),
// //     );

// //     return JSON.parse(jsonPayload); // JSON 파싱
// //   } catch (error) {
// //     return null; // 토큰이 유효하지 않을 때
// //   }
// // };

// // import { useRouter } from "next/router";
// // import { ComponentType, ReactElement, useEffect } from "react";

// // // JWT 디코딩 함수
// // const decodeJWT = (token: string) => {
// //   try {
// //     const base64Url = token.split(".")[1]; // payload 부분 추출
// //     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Base64 형식으로 변환
// //     const jsonPayload = decodeURIComponent(
// //       atob(base64)
// //         .split("")
// //         .map(function (c) {
// //           return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
// //         })
// //         .join(""),
// //     );

// //     return JSON.parse(jsonPayload); // JSON 파싱
// //   } catch (error) {
// //     return null; // 토큰이 유효하지 않을 때
// //   }
// // };

// // // prettier-ignore
// // export const 로그인체크 = (컴포넌트: ComponentType) => <P extends {}>(프롭스: P): ReactElement<P> => {
// //   const router = useRouter();

// //   useEffect(() => {
// //     const token = localStorage.getItem("accessToken");
// //     // ** 10/31 여기서 불러오는 토큰이 아폴로에서 불러온 토큰이면 되지 않을까...?

// //     if (token === null) {
// //       alert("로그인 후 이용가능합니다");
// //       router.push("/login");
// //       return;
// //     }

// //     const decodedToken = decodeJWT(token);

// //     // 토큰 만료 여부 확인 (토큰이 만료되었을 경우)
// //     if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
// //       alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
// //       localStorage.removeItem("accessToken");

// //       router.push("/login");
// //       window.location.reload()
// //       return;
// //     }

// //     // GraphQL 에러 처리: 에러를 감지하면 자동 로그아웃
// //     const handleApiError = (event: any) => {
// //       if (event.detail?.errors) {
// //         const hasAuthError = event.detail.errors.some(
// //           (error: any) => error.extensions?.code === "UNAUTHENTICATED" && error.message.includes("토큰 만료")
// //         );

// //         if (hasAuthError) {
// //           alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
// //           localStorage.removeItem("accessToken"); // 토큰 삭제
// //           router.push("/login"); // 로그인 페이지로 이동
// //         }
// //       }
// //     };

// //     // 전역적으로 에러 이벤트 리스너 추가
// //     window.addEventListener('graphqlError', handleApiError);

// //     // 컴포넌트가 언마운트 될 때 리스너 제거
// //     return () => {
// //       window.removeEventListener('graphqlError', handleApiError);
// //     };
// //   }, []);

// //   return <컴포넌트 {...프롭스} />;
// // };
