import { UploadButton, UploadFileHidden, UploadImage } from "./Upload01.style";
import type { IUploads01UIProps } from "./Upload01.types";

export default function Uploads01UI(props: IUploads01UIProps) {
  return (
    <>
      {props.fileUrl ? (
        <UploadImage onClick={props.onClickUpload} src={props.fileUrl} />
      ) : (
        // 미리보기 이미지를 넣었기 때문에 fileUrl이 아니라 previewImageurl을 넣어준다
        <UploadButton onClick={props.onClickUpload}>
          <div>+</div>
          <div>Upload</div>
        </UploadButton>
      )}
      <UploadFileHidden
        type="file"
        ref={props.fileRef}
        onChange={props.onChangeFile}
      />
    </>
  );
}
