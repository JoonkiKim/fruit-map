import { useMutation } from "@apollo/client";
import React, { useRef } from "react";
import type { ChangeEvent } from "react";

import Uploads01UI from "./Upload01.presenter";
import type { IUploads01Props } from "./Upload01.types";
import { UPLOAD_FILE } from "./Upload01.queries";
import { Modal } from "antd";
import { checkValidationFile } from "../../../commons/libraries/validationFile";

export default function Uploads01(props: IUploads01Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onClickUpload = (e: React.MouseEvent): void => {
    e.preventDefault();
    fileRef.current?.click();
  };

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = event.target.files?.[0];
    const isValid = checkValidationFile(file);
    if (!isValid) return;

    try {
      const result = await uploadFile({ variables: { file } });
      props.onChangeFileUrls(result.data.uploadFile.url, props.index);
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <Uploads01UI
      fileRef={fileRef}
      fileUrl={props.fileUrl}
      defaultFileUrl={props.defaultFileUrl}
      onClickUpload={onClickUpload}
      onChangeFile={onChangeFile}
    />
  );
}
