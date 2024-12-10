import { useRouter } from "next/router";
import LayoutBanner from "./banner";
// import LayoutFooter from "./footer";
import LayoutHeader from "./header";
import LayoutNavigation from "./navigation";

// **특정 주소에서는 헤더를 안보여주고 싶다면, 변수에 해당 주소를 담아서 그 주소랑 일치하면 헤더를 안보여주게 할 수 있음
const HIDDEN_HEADERS = [
  "/section13/13-01-library-icon",
  "/section13/13-02-library-star",
];

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();
  // 아래의 asPath를 찍어보면 지금 주소가 어디인지 확인할 수 있다
  console.log(router.asPath);

  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath);
  //

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* ** isHiddenHeader가 아닐때 즉 숨기는게 아닐때 헤더를 보여준다는 뜻, isHiddenHeader에 주소가 포함되어있으면(true값이 나오면) LayoutHeader태그를 안보여준다 */}
      {!isHiddenHeader && <LayoutHeader />}
      <LayoutBanner />
      <LayoutNavigation />
      {/* <div style={{ height: "500px", display: "flex" }}>
        /* style은 중괄호 두개 들어가는 이유는 js중괄호 + 스타일 중괄호 이기 때문 
        <div style={{ width: "30%", backgroundColor: "orange" }}>사이드바</div> */}
      <div>{props.children}</div>
      {/* </div>
      <LayoutFooter /> */}
    </div>
  );
}
// _app.tsx에서 <Component/>가 {props.children}으로 쏙들어오고 LayOut컴포넌트 전체를 땡겨온다(_app.tsx쪽으로)
