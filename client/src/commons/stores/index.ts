import { collection, getDocs, getFirestore } from "firebase/firestore";
import { atom, selector } from "recoil";
import { firebasefruitapp } from "../libraries/firebase_fruitmap";

// const { persistAtom } = recoilPersist();

// import { refreshAccessToken } from "../libraries/refreshAccessTokenFB";

// // 변수는 atom으로 만들고, 함수는 selector로 만든다
// export const isEditState = atom({
//   key: "isEditState",
//   default: true,
// });

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
  // effects_UNSTABLE: [persistAtom],
});

export const loggedInCheck = atom({
  key: "loggedInCheck",
  default: false,
});

// // 이게 글로벌 함수!!
export const marketinfoGlobal = selector({
  key: "marketinfoGlobal",
  get: async () => {
    const fruitshop = collection(getFirestore(firebasefruitapp), "fruitshop");
    const result = await getDocs(fruitshop);
    const marketinfo = result.docs.map((el) => el.data());
    return marketinfo;
  },
});

// // 이게 글로벌 함수!!
// export const restoreAccessTokenLoadable = selector({
//   key: "restoreAccessTokenLoadable",
//   get: async () => {
//     const newAccessToken = await refreshAccessToken();
//     return newAccessToken;
//   },
// });
