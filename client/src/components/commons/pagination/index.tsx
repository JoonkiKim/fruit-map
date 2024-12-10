// // "State 끌어올리기"
// // FETCH_BOARDS에 어떤 페이지를 불러올지 알려주는 page변수가 startPage라는 state를 통해 변경됨. 페이지네이션에서 setState로 startPage변경 -> 부모 요소에 변경된 스테이트값 전달, FETCH_BOARDS에 반영 -> BoardsList에 변경된 FETCH_BOARDS값이 전달되며 startPage변경값이 최종적으로 반영되는 순서!

// // <부모 요소 js부분에 넣어줄 코드>
// // // 스테이트 끌어올리기를 통해 부모(boards의 index.tsx)컴포넌트에서 FETCH_BOARDS의 page값을 변경해준다음에 각각의 자식 컴포넌트(BoardList, Pagination)에 FETCH_BOARDS값을 data, refetch를 통해 뿌려줘야 '페이지숫자 변경 & 해당 페이지 리패치' 가 적용된다
// // // Pagination에서 refetch를 통해 page 숫자 변경 -> page값이 refetch에 연결된 useQuery를 통해 FETCH_BOARDS의 page값 변경 -> data변수에 담김 -> BoardList에 전달되어 해당 페이지의 게시물 리스트 출력
// // const [startPage, setStartPage] = useState(1);
// // const { data, refetch } = useQuery<
// //   Pick<IQuery, "fetchBoards">,
// //   IQueryFetchBoardsArgs
// // >(FETCH_BOARDS);

// import { ApolloQueryResult } from "@apollo/client";
// import {
//   IQuery,
//   IQueryFetchBoardsArgs,
// } from "../../../commons/types/generated/types";
// import { Dispatch, MouseEvent, SetStateAction } from "react";
// import styled from "@emotion/styled";

// // style 코드
// const PageNationWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `;

// interface IPagination {
//   startPage: number;
//   setStartPage: Dispatch<SetStateAction<number>>;
//   refetch: (
//     variables?: Partial<IQueryFetchBoardsArgs>,
//   ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
//   dataBoardsCount: Pick<IQuery, "fetchBoardsCount">;
// }

// export function Pagination(props: IPagination) {
//   const lastPage = Math.ceil(props.dataBoardsCount?.fetchBoardsCount / 10);
//   // // 여기서 게시글 전체 개수 받아오는걸 사용해줌
//   // fetchBoardsCount에 전체 게시글 개수가 담겨있는거임
//   // lastPage에 마지막 페이지의 숫자가 담김
//   const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
//     props.refetch({ page: Number(event.currentTarget.id) });
//   };

//   const onClickPrevPage = () => {
//     if (props.startPage === 1) {
//       alert("첫 페이지입니다");
//       console.log(props.dataBoardsCount?.fetchBoardsCount);
//       return;
//     }

//     props.setStartPage(props.startPage - 10);
//     props.refetch({ page: props.startPage - 10 });
//   };

//   const onClickNextPage = () => {
//     if (props.startPage + 10 <= lastPage) {
//       props.setStartPage(props.startPage + 10);
//       console.log(lastPage);
//       props.refetch({ page: props.startPage + 10 });
//     } else {
//       alert("마지막 페이지입니다");
//     }
//   };
//   return (
//     <PageNationWrapper>
//       <span onClick={onClickPrevPage}>이전페이지</span>

//       {new Array(10).fill(1).map((_, index) =>
//         index + props.startPage <= lastPage ? (
//           <span
//             key={index + props.startPage}
//             id={String(index + props.startPage)}
//             onClick={onClickPage}
//             style={{ margin: "10px" }}
//           >
//             {index + props.startPage}
//           </span>
//         ) : (
//           <span key={index + props.startPage}></span>
//         ),
//       )}

//       <span onClick={onClickNextPage}>다음페이지</span>
//     </PageNationWrapper>
//   );
// }
