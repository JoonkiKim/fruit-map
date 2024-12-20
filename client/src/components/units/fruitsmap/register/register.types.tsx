import { Timestamp } from "firebase/firestore/lite";
import { Address } from "react-daum-postcode";

export interface MarketInfo {
  documentId: string;
  lat: string;
  lng: string;
  name: string;
  marketaddresszonecode: string;
  marketaddress: string;
  marketaddressDetail: string;
  menu: string;
  imageUrl: string[]; // 선택적으로 존재할 수 있음
  link: string;
  openclose: string;
  createdAt: Timestamp;
}
