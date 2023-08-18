import React, { useRef, useContext } from "react";
import { FilesContext } from "../../App";

export function PdfFile({ file }) {
  const { files, setFiles } = useContext(FilesContext);

  const allFilesUploaded =
    files.some((file) => file.status === "Uploaded") && files.length > 0;

  function deleteFile(id) {
    setFiles((currentFiles) => {
      return currentFiles.filter((file) => file.id !== id);
    });
  }

  function toggleActive(id) {
    setFiles((currentFiles) => {
      return currentFiles.map((file) =>
        file.id === id
          ? { ...file, isActive: !file.isActive }
          : { ...file, isActive: false }
      );
    });
  }

  function addField(value) {
    setFormData((currentFormData) => {
      return [
        ...currentFormData,
        {
          id: crypto.randomUUID(),
          name: name,
          value: value,
        },
      ];
    });
  }

  async function downloadOneFile({ file }) {
    try {
      const pdfData = await fetchFile({ file });
      const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
      saveAs(pdfBlob, file.fileName);
    } catch (error) {
      console.error("Error while downloading file", error);
    }
  }

  function fetchFile({ file }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `https://cvizard.com:8080/api/maker/download?key=${file.id}`,
          { responseType: "arraybuffer" }
        );

        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error("File download failed"));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  return (
    <>
      <li
        onClick={() => toggleActive(file.id)}
        className={`grid grid-cols-4 gap-4 py-3 w-full px-4 h-12 ${
          allFilesUploaded ? "cursor-pointer" : ""
        }
        ${allFilesUploaded && file.isActive ? "bg-cyan-100" : ""}
        ${
          allFilesUploaded && file.isActive
            ? "hover:bg-cyan-200"
            : "hover:bg-slate-100"
        }
        `}
      >
        <p className="col-span-2 text-sm font-semibold leading-6 text-gray-900 overflow-hidden ">
          {file.fileName}
        </p>
        <button
          className={`inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium ${
            file.status === "Pending"
              ? "text-gray-500"
              : file.status === "Uploading"
              ? "text-yellow-500"
              : file.status === "Processing"
              ? "text-sky-500"
              : file.status === "Almost done"
              ? "text-violet-500"
              : file.status === "Done"
              ? "text-lime-500"
              : ""
          }`}
          onClick={() => downloadOneFile({ file, fetchFile })}
          disabled={file.status !== "Download"}
        >
          {file.status}
        </button>

        <button
          onClick={() => deleteFile(file.id)}
          className={
            "inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium bg-white hover:bg-red-100 text-red-700 border border-red-700"
          }
        >
          Delete
        </button>
      </li>
    </>
  );
}
