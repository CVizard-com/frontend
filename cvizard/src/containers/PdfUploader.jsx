import { PdfUploaderBaner } from "../components/pdfUploader/PdfUploaderBaner";
import { ListForm } from "../components/pdfUploader/ListForm";
import { DraggableDropZone } from "../components/pdfUploader/DraggableDropZone";
import React, { useContext, useState, useEffect } from "react";
import { FilesContext } from "../App";
import { createContext } from "react";

export const DragContext = createContext();

export function PdfUploader({ allFilesUploaded }) {
  const { files, setFiles } = useContext(FilesContext);
  const { isDragActive, setIsDragActive } = useState(false);

  useEffect(() => {
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(true);
    };

    window.addEventListener("dragover", handleDragOver);
  }, []);

  return (
    <>
      <DragContext.Provider value={{ isDragActive, setIsDragActive }}>
        <DraggableDropZone />
      </DragContext.Provider>
      <div
        className={`flex items-center justify-center min-h-screen w-full bg-white ${
          isDragActive ? "blur-xl" : ""
        }`}
      >
        <div className="mx-auto max-w-[43rem]">
          <PdfUploaderBaner />
          <ListForm />
        </div>
      </div>
    </>
  );
}
