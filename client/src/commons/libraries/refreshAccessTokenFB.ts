import { auth } from "./firebase_fruitmap"; // Firebase 초기화

// const REFRESH_TOKEN_URL =
//   "https://securetoken.googleapis.com/v1/token?key=AIzaSyA2ll3QKwE7LoJvAX5H3maRjJh9Skqntsc";

// accessToken 상태
let refreshaccessToken = undefined;

// Firebase 액세스 토큰 갱신 함수
export const refreshAccessToken = async (): Promise<string | undefined> => {
  try {
    const user = auth.currentUser;
    console.log("Current user:", user);

    if (!user) {
      console.log("No authenticated user found.");
      return undefined;
    }

    const idTokenResult = await user.getIdTokenResult(true); // force refresh the token
    console.log("New access token:", idTokenResult.token);

    refreshaccessToken = idTokenResult.token;

    return refreshaccessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return undefined;
  }
};
