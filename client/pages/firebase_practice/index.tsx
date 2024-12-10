// 파이어베이스 서버에 데이터를 등록하는 방법! -> 나중에는 프로덕션 모드로 하기

import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";
import { firebasefruitapp } from "../../src/commons/libraries/firebase_fruitmap";
import {
  wrapAsync,
  wrapFormAsync,
} from "../../src/commons/libraries/asyncFunc";
import { useForm } from "react-hook-form";

interface IFormData {
  name: string;
  menu: string;
  address: string;
}

export default function FirebasePracticePage() {
  const { register, handleSubmit } = useForm<IFormData>();

  // 이건 지금 프런트에서의 기능을 정의해주는 것
  const onClickSubmit = (data: IFormData) => {
    const fruitshop = collection(getFirestore(firebasefruitapp), "fruitshop");
    // 문서 추가하기 (등록)
    // board라는 이름의 컬렉션에 아래의 데이터를 넣어줘
    // 여기를 스테이트로 바꾸고 입력값을 넣어주면 된다
    addDoc(fruitshop, {
      name: data.name,
      menu: data.menu,
      address: data.address,
    });
  };

  const onClickFetch = async () => {
    const fruitshop = collection(getFirestore(firebasefruitapp), "fruitshop");
    // 문서 가져오기 (조회)
    const result = await getDocs(fruitshop);
    const datas = result.docs.map((el) => el.data());
    console.log(datas);
  };

  return (
    <>
      <form onSubmit={wrapFormAsync(handleSubmit(onClickSubmit))}>
        가게이름: <input type="text" {...register("name")} />
        대표메뉴 : <input type="text" {...register("menu")} />
        주소 : <input type="text" {...register("address")} />
        <button type="submit">가게 등록하기</button>;
      </form>

      <button type="button" onClick={wrapAsync(onClickFetch)}>
        조회하기
      </button>
    </>
  );
}
