import React, { useEffect, useState } from "react";
import { Badge, Spinner } from "reactstrap";
import { stringShorter } from "../../../core/utils";
import { File } from "react-feather";

import Styled from "./DownloadRow.module.scss";
import { ShowImage } from "./ShowImage/ShowImage";

interface IPropTypes {
  row: any;
  mutate: any;
  type: string;
  useServeShowFile: any;
  fileServer?: Blob;
  isServerFile?: boolean;
  isDownload?: boolean;
}

const DownloadRow: React.FC<IPropTypes> = ({
  row,
  mutate,
  type,
  useServeShowFile,
  fileServer,
  isServerFile = false,
  isDownload = true,
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
      <div
        className={`d-flex justify-content-between align-items-center ${Styled["item-holder"]}`}
      >
        {file && (
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
            <img src={file} alt="" className={Styled["image-file"]} />
          ) : (
            <Spinner className="mr-1" color="primary" size="sm" />
          )}
          <span>
            {stringShorter(
              row && row.fullFileName ? row.fullFileName : row.fileName,
              30
            )}
          </span>
        </div>
        {isDownload && (
          <div>
            <Badge
              style={{ cursor: "pointer" }}
              onClick={
                !serveMutation.isLoading
                  ? () => {
                      downloadFile(
                        row.fullFileName ? row.fullFileName : row.fileName
                      );
                      console.log(row);
                    }
                  : () => {}
              }
              color="info"
              size="sm"
            >
              {serveMutation.isLoading &&
              (row && row.fileName
                ? row.fileName.split(".").pop() !== "pdf"
                : row.fullFileName.split(".").pop() !== "pdf") ? (
                <Spinner color="white" size="sm" />
              ) : (
                "دانلود فایل"
              )}
            </Badge>
          </div>
        )}
      </div>
    </>
  );
};

export { DownloadRow };
