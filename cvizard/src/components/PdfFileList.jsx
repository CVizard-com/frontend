import { PdfFile } from "./PdfFile";
import React, { useContext } from "react";
import { FilesContext } from "../App";

export function PdfFileList() {
  const { files, setFiles } = useContext(FilesContext);

  return (
    <div className="flex items-center justify-center w-full border-b-2 border-slate-300">
      {files.length > 0 ? (
        <ul
          role="list"
          className="divide-y-2 divide-slate-300 w-full max-h-64 overflow-auto"
        >
          {files.length === 0}
          {files.map((file) => {
            return <PdfFile key={file.id} file={file} />;
          })}

          {files.filter((file) => file.status === "pending").length ===
            files.length && files.length > 0}
        </ul>
      ) : null}
    </div>
  );
}
