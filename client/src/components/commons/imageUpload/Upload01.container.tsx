import React, { useRef, useState } from "react";
import type { ChangeEvent } from "react";

import Uploads01UI from "./Upload01.presenter";
import type { IUploads01Props } from "./Upload01.types";

import { Modal } from "antd";
import { checkValidationFile } from "../../../commons/libraries/validationFile";

import { storage } from "../../../commons/libraries/firebase_fruitmap";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function UploadsFruitsMarket(props: IUploads01Props) {
  const fileRef = useRef<HTMLInputElement>();

  const onClickUpload = (e: React.MouseEvent): void => {
    e.preventDefault();
    fileRef.current?.click();
  };

  // 파이어베이스 스토리지 업로드
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
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        console.log(event.target?.result);
        if (typeof event.target?.result === "string") {
          // setImageUrl을 통해 미리보기 이미지를 보여주고
          // 실제로 보낼 이미지(event.target.files?.[0];)는 setFile을 통해 스테이트에 넣어주자
          props.onChangePreviewFileUrls(
            event.target?.result ?? "",
            props.index
          );
        }
      };
      const downloadURL = await uploadFileToFirebaseStorage(file, props.uuid);
      props.onChangeFileUrls(downloadURL, props.index);
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <Uploads01UI
      fileRef={fileRef}
      fileUrl={props.fileUrl}
      onClickUpload={onClickUpload}
      onChangeFile={onChangeFile}
    />
  );
}
