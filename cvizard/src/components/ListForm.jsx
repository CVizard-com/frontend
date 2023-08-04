import React, { useContext } from "react";
import { FilesContext } from "../App";
import { AddFileButton } from "./AddFileButton";
import { UploadFileButton } from "./UploadFileButton";
import { PdfFileList } from "./PdfFileList";

export function ListForm() {
  const { files, setFiles } = useContext(FilesContext);

  const someFilesPending =
    files.some((file) => file.status !== "Download") && files.length > 0;

  return (
    <>
      {files.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center w-8/12 mx-auto rounded-lg border-2 border-slate-300 my-8">
          <PdfFileList />
          <div className="flex items-center justify-center w-full">
            <AddFileButton />
            {someFilesPending && <UploadFileButton />}
          </div>
        </div>
      ) : (
        <AddFileButton />
      )}
    </>
  );
}
