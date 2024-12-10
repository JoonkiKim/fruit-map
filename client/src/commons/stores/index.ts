// import { atom, selector } from "recoil";
// import { getAccessToken } from "../libraries/getAccessToken";

// export const isEditState = atom({
//   key: "isEditState",
//   default: true,
// });

// // 변수는 atom으로 만들고, 함수는 selector로 만든다
// export const accessTokenState = atom({
//   key: "accessTokenState",
//   default: "",
// });

// export const loggedInCheck = atom({
//   key: "loggedInCheck",
//   default: false,
// });

// export const visitedPageState = atom({
//   key: "visitedPageState",
//   default: "",
// });

// // 이게 글로벌 함수!!
// export const restoreAccessTokenLoadable = selector({
//   key: "restoreAccessTokenLoadable",
//   get: async () => {
//     const newAccessToken = await getAccessToken();
//     return newAccessToken;
//   },
// });
