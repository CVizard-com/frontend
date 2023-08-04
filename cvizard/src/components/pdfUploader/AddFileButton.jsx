import React, { useRef, useContext } from "react";
import { FilesContext } from "../../App";

export function AddFileButton() {
  const { files, setFiles } = useContext(FilesContext);
  const fileInputRef = useRef();

  function addFile(event) {
    const acceptedFiles = event.target.files;
    Array.from(acceptedFiles).forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        setFiles((currentFiles) => {
          return [
            ...currentFiles,
            {
              id: crypto.randomUUID(),
              fileName: file.name,
              status: "Pending",
              file: file,
              isActive: false,
              name: [],
              address: [],
              phone: [],
              email: [],
              website: [],
              other: [],
            },
          ];
        });
      };
      reader.readAsDataURL(file);
    });
  }
  return (
    <>
      <button
        type="file"
        onClick={() => fileInputRef.current.click()}
        accept="application/pdf"
        className="flex flex-wrap items-center justify-center w-36 mx-auto rounded-lg bg-cyan-500 py-2 text-white transition-colors hover:bg-cyan-600 my-2"
      >
        <img src="../../images/addFileIcon.png" className="w-6" />
        Add files
      </button>
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={addFile}
        multiple
      />
    </>
  );
}
