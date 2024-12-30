import type { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";
import React from "react";

export interface IUploads01Props {
  index: number;
  fileUrl: string;
  defaultFileUrl?: string;
  onChangeFileUrls: (fileUrl: string, index: number) => void;
  uuid: string;
  onChangePreviewFileUrls: (fileUrl: string, index: number) => void;
}

export interface IUploads01UIProps {
  fileRef: RefObject<HTMLInputElement>;
  fileUrl: string;
  // previewImageUrl: string;

  onClickUpload: (e: React.MouseEvent) => void;
  onChangeFile: (event: ChangeEvent<HTMLInputElement>) => void;
}
