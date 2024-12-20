import type { ChangeEvent, RefObject } from "react";
import React from "react";

export interface IUploads01Props {
  index: number;
  fileUrl: string;
  defaultFileUrl?: string;
  onChangeFileUrls: (fileUrl: string, index: number) => void;
}

export interface IUploads01UIProps {
  fileRef: RefObject<HTMLInputElement>;
  fileUrl: string;
  defaultFileUrl?: string;
  onClickUpload: (e: React.MouseEvent) => void;
  onChangeFile: (event: ChangeEvent<HTMLInputElement>) => void;
}
