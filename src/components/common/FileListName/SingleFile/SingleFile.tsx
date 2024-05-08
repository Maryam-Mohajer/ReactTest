import React from "react";
import {  FileText } from "react-feather";

interface IPropTypes {
  fileName: string
  }
  
const SingleFile: React.FC<IPropTypes>  = ({fileName}) => {
    const MainUrl = process.env.REACT_APP_PUBLIC_PATH;
  return (
    <div style={{ width: "90%" }}>
      <div
        style={{ background: "#0066ff" }}
        className={"p-1 d-flex text-white rounded my-1 align-items-center"}
      >
        <FileText size={20} />
          
        <a
          style={{ color: "#fff" }}
          href={`${MainUrl}/${fileName}`}
          target="_blank"
          rel="noreferrer"
        >
          {fileName}
        </a>
      </div>
    </div>
  );
};

export { SingleFile };
