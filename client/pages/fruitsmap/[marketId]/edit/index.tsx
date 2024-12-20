import { useEffect, useState } from "react";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";
import {
  db,
  firebasefruitapp,
} from "../../../../src/commons/libraries/firebase_fruitmap";
import FruitsRegisterComponentPage from "../../../../src/components/units/fruitsmap/register/register.Index";
import { useRouter } from "next/router";
import { MarketInfo } from "../../../../src/components/units/fruitsmap/register/register.types";

export default function FruitsMapPage() {
  const [defaultData, setDefaultData] = useState<MarketInfo | null>(null);

  const router = useRouter();

  const id = String(router.query.marketId);

  useEffect(() => {
    if (id) {
      const initializeMap = async () => {
        const fruitDocRef = doc(db, "fruitshop", id);
        const fruitDoc = await getDoc(fruitDocRef);
        if (fruitDoc.exists()) {
          const defaultData = fruitDoc.data() as MarketInfo;
          setDefaultData(defaultData);
          // console.log("기존 데이터", defaultData);
        }
      };

      initializeMap();
    }
  }, [id]);

  return (
    <>
      <FruitsRegisterComponentPage isEdit={true} defaultData={defaultData} />
    </>
  );
}
