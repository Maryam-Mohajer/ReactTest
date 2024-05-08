import React, { useState } from "react";
import { X } from "react-feather";
import { Button, FormGroup, ListGroup, ListGroupItem } from "reactstrap";

import { DownloadRow } from "../../../DownloadRow/DownloadRow";
import { ShowImage } from "../../../DownloadRow/ShowImage/ShowImage";
import { FileListName } from "../../../FileListName/FileListName";
import { SingleFile } from "../../../FileListName/SingleFile/SingleFile";
import { SelectModal } from "./SelectModal/SelectModal";

export interface FileInputProps {
  setFieldValue: any;
  files: FileList | File[] | null;
  inputText?: string;
  color?: string;
  disabled?: boolean;
  accept?: string;
  outLine?: boolean;
  typeRequest?: string;
  isSingle?: boolean;
  name?: string;
  removeServedFiles?: () => void;
  fileServer?: Blob[];
  isServerFile?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({
  setFieldValue,
  files,
  name,
  inputText,
  color,
  disabled,
  isSingle,
  accept,
  outLine,

  removeServedFiles,
  fileServer = [],
  isServerFile = false,
}) => {
  const [showSelectModal, setShowSelectModal] = useState<any>(false);

  const [fileToShow, setfileToShow] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <SelectModal
        backdrop={true}
        name={name}
        //data={files}
        isOpen={showSelectModal}
        isSingle={isSingle}
        removeServedFiles={removeServedFiles}
        inputText = {inputText}
        toggleModal={() => setShowSelectModal((val: any) => !val)}
      />
      <ShowImage
        image={fileToShow}
        isOpen={isOpen}
        toggle={() => setIsOpen(false)}
      />
      <FormGroup style={{ paddingTop: "10px" }}>
        <Button
          disabled={disabled}
          outline={outLine}
          color={color ? color : "primary"}
          onClick={() => {
            setShowSelectModal(true);
          }}
        >
          {inputText ? inputText : "بارگزاری اسناد"}
        </Button>

        <p style={{ paddingTop: "10px" }}>
          {files ? (
            files.length > 0 ? (
              <ListGroup tag="div" className="mt-1">
                <ListGroupItem tag="a" active>
                  فایل ها
                </ListGroupItem>
                {Array.from(files).map((item: any, key: any) => {
                  return (
                    <ListGroupItem
                      tag="a"
                      className="d-flex justify-content-between align-items-center"
                      key={key}
                    >
                      {item.fileName && (
                        <>
                          <SingleFile fileName={item.fileName} />
                        </>
                      )}

                      {item.name && (
                        <>
                          {item.name.length > 38
                            ? item.name.slice(0, 37) + "..."
                            : item.name}
                        </>
                      )}
                      <span>
                        <X
                          color="red"
                          onClick={() => {
                            let newFiles = Array.from(files).filter(
                              (file, ind) => ind !== key
                            );

                            setFieldValue(newFiles);
                          }}
                        />
                      </span>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            ) : (
              ""
            )
          ) : (
            " "
          )}
        </p>
      </FormGroup>
    </>
  );
};

export { FileInput };
