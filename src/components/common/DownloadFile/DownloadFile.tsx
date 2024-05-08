import React, { useEffect, useState } from "react";
import { Badge, Spinner } from "reactstrap";
import { stringShorter } from "../../../core/utils";
import { File } from "react-feather";

import Styled from "./DownloadFile.module.scss";
import { ShowImage } from "./ShowImage/ShowImage";

interface IPropTypes {
  row: any;
  mutate: any;
  type: string;
  useServeShowFile: any;
  fileServer?: Blob;
  isServerFile?: boolean;
  isDownload?: boolean;

  hasName: boolean;
  hasDownload: boolean;
  hasModal: boolean;
  ImageHeight: any;
  ImageBorderRadius: string;
  spinnerSize: string;
  spinnerClassName?: string;
  spinnerHolderStyle?: {};
  hasSpinner?: boolean;
  myDefaultSpinner?: any;
  holderDownLoadText?: string;
  downloadTextStyle?: any;
  objectFit?: any;
}

const DownloadFile: React.FC<IPropTypes> = ({
  row,
  mutate,
  type,
  useServeShowFile,
  fileServer,
  isServerFile = false,
  isDownload = true,

  hasName,
  hasDownload,
  hasModal,
  ImageHeight,
  ImageBorderRadius,
  spinnerSize,
  spinnerClassName,
  spinnerHolderStyle,
  hasSpinner = true,
  myDefaultSpinner,
  holderDownLoadText,
  downloadTextStyle,
  objectFit,
}) => {
  const serveMutation = mutate();
  const showFile = useServeShowFile();

  const [file, setFile] = useState<string>("");
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    if (!isServerFile) {
      if (type === "applicant") {
        if (
          row && row.fileName
            ? row.fileName.split(".").pop() !== "pdf"
            : row.fullFileName.split(".").pop() !== "pdf"
        )
          showFile.mutate(row.fullFileName);
      }
    }
  }, [isServerFile]);

  useEffect(() => {
    if (isServerFile && fileServer) {
      const url = window.URL.createObjectURL(fileServer);
      setFile(url);
    }
  }, [isServerFile, fileServer]);

  useEffect(() => {
    if (showFile.isSuccess) {
      const result = showFile.data.data;
      const data = new Blob([result]);
      const url = window.URL.createObjectURL(data);
      setFile(url);
    }
  }, [showFile.isSuccess]);

  const downloadFile = (file: any) => {
    if (type === "applicant") {
      serveMutation.mutate(file);
    }
  };

  return (
    <>
      <div className={` ${Styled["item-holder"]}`}>
        {file && hasModal && (
          <ShowImage
            isOpen={isShow}
            toggle={() => setIsShow(false)}
            image={file}
          />
        )}
        <div onClick={() => setIsShow(true)} className={Styled.pointer}>
          {(
            row && row.fileName
              ? row.fileName.split(".").pop() === "pdf"
              : row.fullFileName.split(".").pop() === "pdf"
          ) ? (
            <File className={Styled["image-file"]} size={30} />
          ) : file ? (
            <img
              src={file}
              alt=""
              className={Styled["image-file"]}
              style={{
                height: ImageHeight,
                borderRadius: ImageBorderRadius,
                objectFit: objectFit ? objectFit : "cover",
              }}
            />
          ) : hasSpinner ? (
            <div
              className="text-center d-flex justify-content-center align-items-center"
              style={spinnerHolderStyle}
            >
              <Spinner
                className={spinnerClassName}
                color="primary"
                size={spinnerSize}
              />
            </div>
          ) : (
            myDefaultSpinner
          )}

          {hasName && (
            <span>
              {stringShorter(
                row && row.fullFileName ? row.fullFileName : row.fileName,
                30
              )}
            </span>
          )}
        </div>

        {hasDownload && isDownload && (
          <div className="d-flex justify-content-center align-items-center">
            <Badge
              style={{ cursor: "pointer" }}
              onClick={
                !serveMutation.isLoading
                  ? () => {
                      downloadFile(
                        row.fullFileName ? row.fullFileName : row.fileName
                      );
                    }
                  : () => {}
              }
              color="info"
              size="sm"
              className={holderDownLoadText ? holderDownLoadText : ""}
            >
              {serveMutation.isLoading &&
              (row && row.fileName
                ? row.fileName.split(".").pop() !== "pdf"
                : row.fullFileName.split(".").pop() !== "pdf") ? (
                <Spinner color="white" size="sm" />
              ) : (
                <span style={downloadTextStyle ? downloadTextStyle : {}}>
                  دانلود فایل
                </span>
              )}
            </Badge>
          </div>
        )}
      </div>
    </>
  );
};

export { DownloadFile };
