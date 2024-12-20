// 파이어베이스 서버에 데이터를 등록하는 방법! -> 나중에는 프로덕션 모드로 하기

import FruitsRegisterComponentPage from "../../../src/components/units/fruitsmap/register/register.Index";

export default function FruitsRegisterPage() {
  return <FruitsRegisterComponentPage isEdit={false} />;
}
