import { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../../../../src/commons/libraries/firebase_fruitmap";
import { useRouter } from "next/router";
import { MarketInfo } from "../../../../src/components/units/fruitsmap/register/register.types";
import FruitsRegisterComponentPage from "../../../../src/components/units/fruitsmap/register/register.Index";

export default function FruitsMapPage() {
  const [defaultData, setDefaultData] = useState<MarketInfo>();
  // const [defaultData, setDefaultData] = useState<MarketInfo | undefined>(
  //   undefined
  // );

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
