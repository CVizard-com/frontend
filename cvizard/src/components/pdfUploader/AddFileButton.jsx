import React, { useRef, useContext } from "react";
import { FilesContext } from "../../App";
import addFileIcon from "../../images/addFileIcon.png";

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
              fields: {
                name: [],
                address: [],
                phone: [],
                website: [],
                email: [],
                other: [],
              },
            },
          ];
        });
      };
      reader.readAsDataURL(file);
    });
  }
  const allFilesUploaded =
    files.every((file) => file.status === "Uploaded") && files.length > 0;
  return (
    <>
      <button
        type="file"
        onClick={() => fileInputRef.current.click()}
        disabled={allFilesUploaded}
        accept={("application/pdf", "docx")}
        className={`flex flex-wrap items-center justify-center w-36 h-10 mx-auto rounded-lg text-white transition-colors py-2 my-2
        ${
          allFilesUploaded
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-cyan-500 hover:bg-cyan-600"
        }`}
      >
        <img src={addFileIcon} className="w-6 mx-1" />
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
