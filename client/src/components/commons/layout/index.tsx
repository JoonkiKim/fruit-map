// import { useRouter } from "next/router";

import LayoutHeader from "./header";

// const HIDDEN_HEADERS = [
//   "/fruitsmap/new", // 새 등록 페이지
//   "/fruitsmap/[marketId]/edit", // 동적 경로 편집 페이지
//   "/login",
//   "/signUp",
// ];

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps) {
  // const router = useRouter();
  // // 아래의 asPath를 찍어보면 지금 주소가 어디인지 확인할 수 있다
  // console.log(router.asPath);

  // const isHiddenHeader = HIDDEN_HEADERS.includes(router.pathname);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <LayoutHeader />
      <div>{props.children}</div>
    </div>
  );
}
// _app.tsx에서 <Component/>가 {props.children}으로 쏙들어오고 LayOut컴포넌트 전체를 땡겨온다(_app.tsx쪽으로)
