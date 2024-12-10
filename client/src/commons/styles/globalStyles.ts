// 모든 요소에 적용할 스타일을 _app.tsx에 넘겨주기 위한 globalStyles

import { css } from "@emotion/react";

// 이 변수를 _app.tsx에 <Global styles={globalStyles} />형태로 넘겨준다
export const globalStyles = css`
  * {
    margin: 0;
    box-sizing: border-box;
    font-size: 20px;
    /* display: flex; */
    /* flex-direction: column; */

    /* font-family: "myfont"; */
    /* text-align: center; */
  }

  @font-face {
    // font-family는 폰트의 별명을 내가 지어주는거고 src는 폰트를 가져올 주소를 적어주면됨
    // _app.tsx말고도 아무데서나 font-family: "myfont";를 해주면 이걸 적용할 수 있음
    font-family: "myfont";
    src: url("/fonts/NotoSansKR-VariableFont_wght.ttf");
  }
`;

// 폰트 다운로드 받을때 같은거라도 용량이 작은 폰트를 다운로드 받아라
// Subset font : 자주쓰는 글자만 폰트를 만들어놓은 '경량화 폰트'라는 것도 있으니까 내가 만드는 프로덕트가 특정 글자만 많이 사용하게 된다면 다운받을때 경량화 폰트를 받자
// Fallback font : 폰트를 여러개 지정해놓고 앞에 폰트가 적용이 안되면 뒤에 있는 애들로 적용
