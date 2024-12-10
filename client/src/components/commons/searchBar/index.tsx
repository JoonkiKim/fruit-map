// import { ChangeEvent, Dispatch, SetStateAction } from "react";
// import {
//   Magnifier,
//   SearchTitle,
//   SearchWindow,
//   SearchWrapper,
// } from "../../units/homework/list/BoardList.style";
// import { ApolloQueryResult } from "@apollo/client";
// import {
//   IQuery,
//   IQueryFetchBoardsArgs,
//   IQueryFetchBoardsCountArgs,
// } from "../../../commons/types/generated/types";
// import _ from "lodash";

// interface IPropsSearchBar {
//   setKeyword: Dispatch<SetStateAction<string>>;
//   refetch: (
//     variables?: Partial<IQueryFetchBoardsArgs>,
//   ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
//   refetchCount?: (
//     variables?: Partial<IQueryFetchBoardsCountArgs>,
//   ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoardsCount">>>;
// }
// export default function SearchBar(props: IPropsSearchBar) {
//   // 리페치는 BoardList에서 선언해주고 props로 여기서 받아와야, boardlist에 대한 리페치를 수행할 수 있다
//   const getDebounce = _.debounce((value) => {
//     props.refetch({ search: value, page: 1 });

//     // 여기다가 search값에 대한 리페치를 진행하고 그 개수만 세어주기만 하면 알아서 dataBoardsCount값이 페이지네이션으로 넘아가서 페이지가 만들어진다
//     // 검색결과에 대한 페이지네이션 처리를 위해 페치보드 카운트도 받는다
//     props.refetchCount({ search: value });
//     props.setKeyword(value);
//   }, 500);

//   const onChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
//     getDebounce(event.currentTarget.value);
//   };

//   return (
//     <SearchWrapper>
//       <SearchTitle>
//         <Magnifier src="/images/magnifier.png" />
//       </SearchTitle>
//       <SearchWindow
//         type="text"
//         onChange={onChangeSearch}
//         placeholder="검색할 제목을 입력해주세요"
//       ></SearchWindow>
//     </SearchWrapper>
//   );
// }
