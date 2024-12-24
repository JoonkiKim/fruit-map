import {
  collection,
  addDoc,
  getFirestore,
  doc,
  updateDoc,
} from "firebase/firestore/lite";

import _ from "lodash";
import { useForm } from "react-hook-form";
import { db } from "../../../../commons/libraries/firebase_fruitmap";

import { yupResolver } from "@hookform/resolvers/yup";
import { wrapFormAsync } from "../../../../commons/libraries/asyncFunc";
import {
  AdressInput,
  AdressInputWrapper,
  AdressWrapper,
  ErMes,
  FirstLineWrapper,
  FormWrapper,
  FruitsCaptionWrapper,
  FruitsInput,
  FruitsMarketWrapper,
  FruitsNormalDiv,
  FruitsTimePicker,
  ImageWrapper,
  LogoImg,
  LogoTxt,
  LogoWrapper,
  MainContentWrapper,
  PostCodeInput,
  PostSearchButton,
  RegisterButton,
} from "./register.style";

import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import UploadsFruitsMarket from "../../../commons/imageUpload/Upload01.container";
import { MarketInfo } from "./register.types";
// import { doc, updateDoc } from "firebase/firestore";

declare const window: typeof globalThis & {
  kakao: any;
};

const schema = yup.object({
  name: yup.string().required("가게이름은 필수입력입니다."),

  menu: yup
    .string()
    .min(1, "최소 1글자 이상 입력해주세요")
    .max(100, "최대 100글자로 입력해주세요")
    .required("메뉴는는 필수 입력입니다. "),

  openclose: yup.string().required("영업시간은 필수 입력입니다. "),

  marketaddresszonecode: yup.string(),
  marketaddress: yup.string(),

  marketaddressDetail: yup.string().required("상세 주소 입력은 필수입니다"),

  imageUrl: yup
    .array()
    .test(
      "isImageUploaded",
      "이미지는 필수 업로드 항목입니다.",
      (value) => value && value.some((url) => url)
    ),
  link: yup.string(),

  lat: yup.string(),
  lng: yup.string(),
});

type IFormData = yup.InferType<typeof schema>;

interface IFruitsRegisterComponentProps {
  isEdit: boolean;
  defaultData?: MarketInfo;
}

export default function FruitsRegisterComponentPage(
  props: IFruitsRegisterComponentProps
) {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const marketId = router.query.id;
    }
  }, [router.isReady, router.query.id]);
  const { register, handleSubmit, formState, setValue, trigger } =
    useForm<IFormData>({
      resolver: yupResolver(schema),
      mode: "onSubmit",
    });
  const [addressData, setAddressData] = useState<Address | undefined>();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [uuid, setUuid] = useState(uuidv4());
  const [fileUrls, setFileUrls] = useState(["", "", ""]); // 이미지 상태 초기화
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const startTime = dayjs("00:00", "HH:mm");
  const endTime = dayjs("02:00", "HH:mm");

  const [defaultstartTimeString, setDefaultstartTimeString] = useState(
    dayjs().format("HH:mm")
  );
  const [defaultendTimeString, setDefaultendTimeString] = useState(
    dayjs().format("HH:mm")
  );

  const format = "HH:mm";

  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  // 등록하기 버튼 관련
  // 이건 지금 프런트에서의 기능을 정의해주는 것
  const onClickSubmit = (data: IFormData) => {
    const fruitshop = collection(db, "fruitshop");
    // 문서 추가하기 (등록)
    // fruitshop라는 이름의 컬렉션에 아래의 데이터를 넣어줘
    // 여기를 스테이트로 바꾸고 입력값을 넣어주면 된다
    addDoc(fruitshop, {
      name: data.name,
      menu: data.menu,
      marketaddresszonecode: data.marketaddresszonecode,
      marketaddress: data.marketaddress,
      marketaddressDetail: data.marketaddressDetail,
      link: data.link,
      lat: lat,
      lng: lng,
      openclose: data.openclose,
      id: uuid,
      imageUrl: data.imageUrl,

      createdAt: new Date(),
    });

    alert("등록 완료!");
    setValue("name", "");
    setValue("menu", "");
    setValue("marketaddresszonecode", "");
    setValue("marketaddress", "");
    setAddressData(undefined);
    setValue("marketaddressDetail", "");
    setValue("link", "");
    setValue("openclose", "");
    setValue("imageUrl", ["", "", ""]);
    setLat(0);
    setLng(0);
    setUuid("");
    setFileUrls(["", "", ""]);
    router.push(`/fruitsmap`);
  };

  // const handleComplete = (data: Address) => {
  //   // console.log(data);
  //   setAddressData(data);
  //   onToggleModal();
  //   setValue("marketaddress", data.address);
  //   setValue("marketaddresszonecode", data.zonecode);
  //   if (!window.kakao || !window.kakao.maps) {
  //     throw new Error("Kakao Maps SDK not loaded.");
  //   }

  //   // 주소의 handleComplete안에 카카오태그 불러오는 것까지 다 하는거다
  //   // 카카오 지도 스크립트 추가
  //   const script = document.createElement("script");
  //   script.src = script.src =
  //     "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1959f4231719c25f68b4c5b5443d7c37&libraries=services";

  //   document.head.appendChild(script);

  //   script.onload = () => {
  //     window.kakao.maps.load(() => {
  //       const geocoder = new window.kakao.maps.services.Geocoder();

  //       geocoder.addressSearch(
  //         data.address,
  //         function (result: any, status: any) {
  //           if (status === window.kakao.maps.services.Status.OK) {
  //             const latresult = result[0].y; // 위도
  //             const lngresult = result[0].x; // 경도

  //             setLat(latresult);
  //             setLng(lngresult);
  //           }
  //         }
  //       );
  //     });
  //   };

  //   // console.log(lat);
  //   // console.log(lng);
  // };

  // 영업시간 put 입력 함수

  const handleComplete = (data: Address) => {
    try {
      setAddressData(data);
      onToggleModal();
      setValue("marketaddress", data.address);
      setValue("marketaddresszonecode", data.zonecode);

      if (!window.kakao || !window.kakao.maps) {
        throw new Error("Kakao Maps SDK not loaded.");
      }

      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(data.address, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const latresult = result[0].y; // 위도
          const lngresult = result[0].x; // 경도
          setLat(latresult);
          setLng(lngresult);

          console.log(lat, lng);
        } else {
          console.warn("Failed to get coordinates for address.");
        }
      });
    } catch (error) {
      console.error("Error handling address:", error);
    }
  };

  const handleTimeChange = (value: any) => {
    if (value && value.length === 2) {
      const [start, end] = value;
      const formattedTime = `${start?.format(format)} - ${end?.format(format)}`;
      setValue("openclose", formattedTime); // 필드 값 설정
      trigger("openclose"); // 유효성 검사 트리거
    }
  };

  // 이미지 업로드 관련
  // DB저장 용
  // const [fileUrls, setFileUrls] = useState(["", "", ""]);
  // 미리보기 용
  // const [previewImageUrls, setPreviewImageUrls] = useState(["", "", ""]);
  const onChangeFileUrls = (fileUrl: string, index: number): void => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);

    setValue("imageUrl", newFileUrls);
  };

  // 로고 클릭시 메인 지도 페이지로 이동

  useEffect(() => {
    if (router.isReady) {
      const marketId = router.query.id;
    }
  }, [router.isReady, router.query.id]);
  const onLogoClick = () => {
    router.push(`/fruitsmap`);
  };

  // <수정하기 페이지 관련>

  // 수정하기 페이지에서 변경 사항을 확인하기 위한 초기값 상태 관리

  const [initialValues, setInitialValues] = useState({
    name: "",
    menu: "",
    marketaddresszonecode: "",
    marketaddress: "",
    marketaddressDetail: "",
    link: "",
    openclose: "",
    imageUrl: [],
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (!props.isEdit || !props.defaultData) {
      setLoading(false);
      return;
    }

    const initializeForm = () => {
      try {
        setValue("name", props.defaultData.name || "");
        setValue("menu", props.defaultData.menu || "");
        setValue(
          "marketaddresszonecode",
          props.defaultData.marketaddresszonecode || ""
        );
        setValue("marketaddress", props.defaultData.marketaddress || "");
        setValue(
          "marketaddressDetail",
          props.defaultData.marketaddressDetail || ""
        );
        setValue("link", props.defaultData.link || "");
        setValue("imageUrl", props.defaultData.imageUrl || []);

        const openclose = props.defaultData.openclose || "00:00 - 00:00";
        const [defaultStart, defaultEnd] = openclose.split("-");

        setDefaultstartTimeString(defaultStart.trim());
        setDefaultendTimeString(defaultEnd.trim());
        setValue("openclose", props.defaultData.openclose || "");
        setLat(Number(props.defaultData.lat) || 0);
        setLng(Number(props.defaultData.lng) || 0);
        setFileUrls([...props.defaultData.imageUrl]);

        // 로딩 완료
        setLoading(false);
      } catch (error) {
        console.error("Error initializing form:", error);
        setLoading(false);
      }
    };

    initializeForm();
  }, [props.defaultData, props.isEdit, setValue]);

  // 기본 값 노출하기기
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (props.defaultData) {
      try {
        setValue("name", props.defaultData.name || "");
        setValue("menu", props.defaultData.menu || "");
        setValue(
          "marketaddresszonecode",
          props.defaultData.marketaddresszonecode || ""
        );
        setValue("marketaddress", props.defaultData.marketaddress || "");
        setValue(
          "marketaddressDetail",
          props.defaultData.marketaddressDetail || ""
        );
        setValue("link", props.defaultData.link || "");
        setValue("imageUrl", props.defaultData.imageUrl || []);

        const openclose = props.defaultData.openclose || "00:00 - 00:00";
        const [defaultStart, defaultEnd] = openclose.split("-");
        setDefaultstartTimeString(defaultStart.trim());

        setValue("openclose", props.defaultData.openclose || "");
        setDefaultendTimeString(defaultEnd.trim());
        setLat(Number(props.defaultData.lat) || 0);
        setLng(Number(props.defaultData.lng) || 0);

        if (props.isEdit) {
          setInitialValues({
            name: props.defaultData.name || "",
            menu: props.defaultData.menu || "",
            marketaddresszonecode:
              props.defaultData.marketaddresszonecode || "",
            marketaddress: props.defaultData.marketaddress || "",
            marketaddressDetail: props.defaultData.marketaddressDetail || "",
            link: props.defaultData.link || "",
            openclose: props.defaultData.openclose || "",
            imageUrl: props.defaultData.imageUrl || [],
            lat: Number(props.defaultData.lat) || 0,
            lng: Number(props.defaultData.lng) || 0,
          });
        }

        setIsReady(true);
      } catch (error) {
        console.error("Error initializing form values:", error);
      }
    }
  }, [props.isEdit, props.defaultData, setValue]);

  // 영업시간 기본값
  const defaultStartTime = dayjs(defaultstartTimeString, "HH:mm");
  const defaultEndTime = dayjs(defaultendTimeString, "HH:mm");

  // 카카오 지도 로드 확인
  useEffect(() => {
    if (typeof window !== "undefined" && !window.kakao) {
      const script = document.createElement("script");
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1959f4231719c25f68b4c5b5443d7c37&libraries=services";
      script.onload = () => {
        console.log("Kakao Maps SDK loaded");
      };
      script.onerror = () => {
        console.error("Failed to load Kakao Maps SDK");
      };
      document.head.appendChild(script);
    }
  }, []);

  // console.log(defaultStartTime, defaultEndTime);
  // 수정하기 페이지 이미지 기본값
  useEffect(() => {
    const images = props.defaultData?.imageUrl;
    if (images !== undefined && images !== null) setFileUrls([...images]);
  }, [props.defaultData]);

  // 수정하기 요청 함수
  const id = String(router.query.marketId);

  const onClickUpdate = async (data: IFormData) => {
    console.log("버튼 눌림");
    const isNameChanged = data.name !== initialValues.name;
    const isMenuChanged = data.menu !== initialValues.menu;

    const isAdressZoneCodeChanged =
      data.marketaddresszonecode !== initialValues.marketaddresszonecode;
    const isAdressChanged =
      addressData?.address && // addressData가 존재할 때만 비교
      addressData?.address?.trim() !== initialValues.marketaddress.trim();

    const isAdressDetailChanged =
      data.marketaddressDetail !== initialValues.marketaddressDetail;

    const isLinkChanged = data.link !== initialValues.link;

    // const isLatChanged = String(lat) !== props.defaultData.lat;
    // const isLngChanged = String(lng) !== props.defaultData.lng;

    const isOpenCloseChanged = data.openclose !== initialValues.openclose;

    const isFileUrlsChanged = !_.isEqual(fileUrls, initialValues.imageUrl);

    if (
      !isNameChanged &&
      !isMenuChanged &&
      !isAdressZoneCodeChanged &&
      !isLinkChanged &&
      !isOpenCloseChanged &&
      !isFileUrlsChanged &&
      !isAdressChanged &&
      !isAdressDetailChanged
    ) {
      alert("수정된 사항이 없습니다.");
      return;
    }

    // 변경된 필드만 추출
    const updatedData: IFormData = {};

    if (isAdressChanged || isAdressDetailChanged) {
      if (isAdressChanged) {
        updatedData.marketaddresszonecode = addressData?.zonecode;
        updatedData.marketaddress = addressData?.address;
        updatedData.lat = String(lat);
        updatedData.lng = String(lng);
      }
      if (isAdressDetailChanged) {
        updatedData.marketaddressDetail = data.marketaddressDetail;
      }
    }

    if (isNameChanged) updatedData.name = data.name;
    if (isMenuChanged) updatedData.menu = data.menu;
    if (isLinkChanged) updatedData.link = data.link;

    if (isFileUrlsChanged) {
      updatedData.imageUrl = fileUrls;
    }

    if (isOpenCloseChanged) {
      updatedData.openclose = data.openclose;
    }

    try {
      // console.log(updatedData);
      // db를 가져오는데 오래걸리는거였다. 초기화는 firebase_fruitapp에서 하고 불러오는것만 여기서 가져오는거임!
      const docRef = doc(db, "fruitshop", id);

      await updateDoc(docRef, {
        ...updatedData,
      });

      alert("수정이 완료되었습니다!");
      router.push(`/fruitsmap`);
    } catch (error) {
      alert("수정에 실패했습니다. 다시 시도해주세요.");
      console.error(error);
    }
  };

  // console.log(props.isEdit);

  const onSubmit = (data: IFormData) => {
    console.log("onSubmit 호출"); // 로그 추가
    if (props.isEdit) {
      onClickUpdate(data);
    } else {
      onClickSubmit(data);
    }
  };

  return (
    <>
      <MainContentWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <form onSubmit={wrapFormAsync(handleSubmit(onSubmit))}> */}
          <FormWrapper>
            <LogoWrapper>
              <LogoImg src="/images/fruit.png" onClick={onLogoClick}></LogoImg>
              <LogoTxt>과일판매점 {props.isEdit ? "수정" : "등록"}하기</LogoTxt>
            </LogoWrapper>
            <FruitsMarketWrapper>
              <FruitsCaptionWrapper>가게 이름</FruitsCaptionWrapper>
              <FruitsInput type="text" {...register("name")} />
            </FruitsMarketWrapper>

            <ErMes>{formState.errors.name?.message}</ErMes>
            <FruitsMarketWrapper>
              <FruitsCaptionWrapper>대표 메뉴</FruitsCaptionWrapper>
              <FruitsInput type="text" {...register("menu")} />
            </FruitsMarketWrapper>

            <ErMes>{formState.errors.menu?.message}</ErMes>
            <FruitsMarketWrapper>
              <FruitsCaptionWrapper>주소</FruitsCaptionWrapper>
              <FirstLineWrapper>
                <PostCodeInput
                  type="text"
                  placeholder="07250"
                  readOnly
                  value={
                    addressData?.zonecode ||
                    props.defaultData?.marketaddresszonecode ||
                    ""
                  }
                ></PostCodeInput>

                <PostSearchButton onClick={onToggleModal} type="button">
                  우편번호 검색
                </PostSearchButton>
                {isOpen && (
                  <Modal
                    open={true}
                    onOk={onToggleModal}
                    onCancel={onToggleModal}
                  >
                    <DaumPostcodeEmbed onComplete={handleComplete} />
                  </Modal>
                )}
              </FirstLineWrapper>
              <AdressInputWrapper>
                <AdressInput
                  type="text"
                  readOnly
                  value={
                    addressData?.address ||
                    props.defaultData?.marketaddress ||
                    ""
                  }
                  {...register("marketaddress")}
                ></AdressInput>
              </AdressInputWrapper>
              <AdressInputWrapper>
                <AdressInput
                  type="text"
                  {...register("marketaddressDetail")}
                ></AdressInput>
              </AdressInputWrapper>

              <ErMes>{formState.errors.marketaddressDetail?.message}</ErMes>
            </FruitsMarketWrapper>

            <FruitsMarketWrapper>
              <FruitsCaptionWrapper>영업 시간</FruitsCaptionWrapper>

              {props.isEdit ? (
                isReady && (
                  <FruitsTimePicker
                    defaultValue={[defaultStartTime, defaultEndTime]}
                    minuteStep={15}
                    hourStep={1}
                    format={format}
                    onChange={handleTimeChange}
                  />
                )
              ) : (
                <FruitsTimePicker
                  defaultValue={[startTime, endTime]}
                  minuteStep={15}
                  hourStep={1}
                  format={format}
                  onChange={handleTimeChange}
                />
              )}
            </FruitsMarketWrapper>

            <ErMes>{formState.errors.openclose?.message}</ErMes>
            <FruitsMarketWrapper>
              <FruitsCaptionWrapper>가게 홈페이지 링크</FruitsCaptionWrapper>
              <FruitsInput type="text" {...register("link")} />
            </FruitsMarketWrapper>

            <ErMes>{formState.errors.link?.message}</ErMes>

            <FruitsMarketWrapper>
              <FruitsCaptionWrapper>가게 사진</FruitsCaptionWrapper>

              <ImageWrapper>
                {" "}
                {fileUrls.map((el, index) => (
                  <UploadsFruitsMarket
                    key={uuidv4()}
                    index={index}
                    fileUrl={el}
                    onChangeFileUrls={onChangeFileUrls}
                    uuid={uuid}
                  />
                ))}
              </ImageWrapper>
            </FruitsMarketWrapper>

            <RegisterButton type="submit">
              가게 {props.isEdit ? "수정" : "등록"}하기
            </RegisterButton>
          </FormWrapper>
        </form>
      </MainContentWrapper>
    </>
  );
}
