import React from "react";
import {  FileText } from "react-feather";
import { IFilenameList } from "../../../core/models/FilenameList.model";
import { SingleFile } from "./SingleFile/SingleFile";

interface IPropTypes {
    files: IFilenameList[];
  }
  
const FileListName: React.FC<IPropTypes>  = ({files}) => {

  return (
    <div className="w-100 ">
        {
            files&&files.map((item,index)=>{
                return <SingleFile fileName={item.fileName} />; 
            })
        }
    </div>
  );
};

export { FileListName };
