import React, { FC, useCallback, useState } from "react";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import Cropper from "react-easy-crop";
import { SimpleSubmitButton } from "../..";
import getCroppedImg from "./CroppImage";
import Styles from "./CropModal.module.scss";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Icon } from "@iconify/react";

interface IPropTypes {
  isOpen: boolean;
  toggle: () => void;
  file: string;
  setFieldValue: (val: any) => void;
  fileType: string;
  aspect?: number;
}

const CropModal: FC<IPropTypes> = ({
  isOpen,
  toggle,
  file,
  setFieldValue,
  fileType,
  aspect,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage: any = await getCroppedImg(
        file,
        croppedAreaPixels,
        rotation
      );

      const blob = await (await fetch(croppedImage)).blob();
      const exportFile: File = new File([blob], `untitled.${fileType}`, {
        type: blob.type,
      });
      setFieldValue([exportFile]);
      toggle();
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered">
      <ModalHeader toggle={toggle}>ویرایش عکس</ModalHeader>
      <ModalBody>
        <div className={Styles["cropper-holder"]}>
          <Cropper
            image={file}
            crop={crop}
            zoom={zoom}
            aspect={aspect ? aspect : 4 / 4}
            onCropChange={setCrop}
            // onRotationChange={(rotation : number) => {
            //   setRotation(rotation)
            // }}
            rotation={rotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      </ModalBody>

      <Row className="d-flex flex-row-reverse mt-2 px-2">
        <Col md="11">
          <Slider
            min={34}
            value={zoom * 34}
            onChange={(val) => setZoom(val / 34 < 1 ? 1 : val / 34)}
          />
        </Col>
        <Col md="1">
          <a
            style={{ position: "relative", top: "-2px" }}
            onClick={() => {
              if (rotation === 360) setRotation(0);
              setRotation((prev: number) => prev + 90);
            }}
          >
            <Icon
              icon="feather:rotate-cw"
              width="20"
              height="20"
              color="info"
            />
          </a>
        </Col>
      </Row>
      <ModalFooter className="d-flex justify-content-start">
        <SimpleSubmitButton
          btnText="تایید"
          isLoading={false}
          onCLick={showCroppedImage}
        />
      </ModalFooter>
    </Modal>
  );
};

export { CropModal };
