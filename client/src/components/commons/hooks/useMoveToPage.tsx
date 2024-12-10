// import { useRouter } from "next/router";
// import { useRecoilState } from "recoil";
// import { visitedPageState } from "../../../commons/stores";

// interface IUseMoveToPageReturn {
//   visitedPage: string;
//   onClickMoveToPage: (path: string) => () => void;
// }

// export const useMoveToPage = (): IUseMoveToPageReturn => {
//   const router = useRouter();

//   const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);
//   const onClickMoveToPage = (path: string) => () => {
//     // 글로벌스테이트에 경로를 담아줬으니까 어느 페이지에서든 해당 주소값을 사용할 수 있다
//     setVisitedPage(path); // 로그인 페이지 일때는 set하지 않도록 조건추가하기
//     // localStorage.setItem("visitedPage", path); -> 로컬스토리지에 저장하는 것도 가능!
//     router.push(path);
//   };

//   return {
//     // onClickMoveToPage: onClickMoveToPage,
//     // 숏핸드
//     onClickMoveToPage,

//     visitedPage,
//   };
// };
