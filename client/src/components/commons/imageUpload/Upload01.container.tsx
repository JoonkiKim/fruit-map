import React, { useRef, useState } from "react";
import type { ChangeEvent } from "react";

import Uploads01UI from "./Upload01.presenter";
import type { IUploads01Props } from "./Upload01.types";

import { Modal } from "antd";
import { checkValidationFile } from "../../../commons/libraries/validationFile";

import { storage } from "../../../commons/libraries/firebase_fruitmap";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function UploadsFruitsMarket(props: IUploads01Props) {
  const fileRef = useRef<HTMLInputElement>(undefined);

  const onClickUpload = (e: React.MouseEvent): void => {
    e.preventDefault();
    fileRef.current?.click();
  };

  // 파이어베이스 스토리지 업로드드
  const uploadFileToFirebaseStorage = async (file, uuid) => {
    const storageRef = ref(storage, `images/${uuid}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (file === undefined) return;
    console.log(file);
    console.log("파일까지 나옴");
    const isValid = checkValidationFile(file);
    if (!isValid) return;

    try {
      const downloadURL = await uploadFileToFirebaseStorage(file, props.uuid);

      props.onChangeFileUrls(downloadURL, props.index);

      // const fileReader = new FileReader();
      // fileReader.readAsDataURL(file);
      // fileReader.onload = (event) => {
      //   if (typeof event.target?.result === "string")
      //     props.setPreviewImageUrl(event.target?.result ?? "");
      //   console.log(event.target?.result);
      // };
      // 화면에 보이는 미리보기 이미지 URL을 생성했으니까 setImageUrl을 통해 주소를 넣어주고 img태그에 imgUrl스테이트를 넣어주면 미리보기 생성완!
      // };
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <Uploads01UI
      fileRef={fileRef}
      fileUrl={props.fileUrl}
      // previewImageUrl={props.previewImageUrl}
      defaultFileUrl={props.defaultFileUrl}
      onClickUpload={onClickUpload}
      onChangeFile={onChangeFile}
    />
  );
}
