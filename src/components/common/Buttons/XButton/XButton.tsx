import React, { FC } from "react";
import { X } from "react-feather";

interface IProps {
  onClick: () => void;
}

const XButton: FC<IProps> = ({ onClick }) => {
  return (
    <div className="d-flex flex-row-reverse mb-1">
      <a
        style={{
          marginTop: "-7px",
          position: "relative",
        }}
        onClick={onClick}
      >
        <X size={20} color="red" className="cursor-pointer" />
      </a>
    </div>
  );
};

export default XButton;
