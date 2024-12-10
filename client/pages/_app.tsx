// 모든 페이지에서 사용하는 공통 설정들을 여기서 한다

import type { AppProps } from "next/app";
import ApolloSetting from "../src/components/commons/layout/apollo";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <RecoilRoot>
        {/* 이렇게 RecoilRoot로 전체를 감싸주면 글로벌 스테이트를 다들 공유할 수 있게 된다  */}
        <ApolloSetting>
          <>
            <Global styles={globalStyles} />
            {/* <Layout> */}
            <Component {...pageProps} />
            {/* </Layout> */}
            {/* // Component는 우리가 지금 보는 페이지 */}
            {/* index.js에서 실행을 하면 html부분이 잘라내기 되어서 component부분으로 들어와서 실행이 된다 */}
          </>
        </ApolloSetting>
      </RecoilRoot>
    </div>
  );
}
