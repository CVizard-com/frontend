import { FilesContext } from "../../App";
import { createContext, useContext, useEffect, useState } from "react";

// import { toggleActive } from "../pdfUploader/PdfFile";

export function ProcessButton({ activeFile }) {
  const { files, setFiles } = useContext(FilesContext);

  function toggleActive(id) {
    setFiles((currentFiles) => {
      return currentFiles.map((file) =>
        file.id === id
          ? { ...file, isActive: !file.isActive }
          : { ...file, isActive: false }
      );
    });
  }

  const getCurrentIndex = () => {
    return files.findIndex((file) => file === activeFile);
  };
  const getNextItem = () => {
    const currentIndex = getCurrentIndex();
    const nextIndex = (currentIndex + 1) % files.length;
    return files[nextIndex];
  };
  function handleNextItem() {
    const nextFile = getNextItem();
    toggleActive(nextFile.id);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-20">
      <button
        onClick={() => handleNextItem()}
        className="flex flex-wrap items-center w-full justify-center w-36 mx-auto rounded-lg bg-cyan-500 py-2 text-white transition-colors hover:bg-cyan-600 my-2 mx-10"
      >
        {/* <img src="../../images/process.png " className="w-5 mx-4" /> */}
        Process
      </button>
    </div>
  );
}
