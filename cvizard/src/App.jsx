import { useState, useEffect, useRef } from "react";

import axios from "axios";
import FileSaver from "file-saver";
import { Baner } from "./Baner";
import { PdfFile } from "./PdfFile";
import { AddFileButton } from "./AddFileButton";
import { PdfFileList } from "./PdfFileList";
import { TransferButton } from "./TransferButton";
import JSZip from "jszip";

export default function App() {
  var filesStatus = "";
  const [files, setFiles] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  // const [filesStatus, setFilesStatus] = useState();

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(files));
  }, [files]);

  function addFile(event) {
    Array.from(event.target.files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        setFiles((currentFiles) => {
          return [
            ...currentFiles,
            {
              id: crypto.randomUUID(),
              name: file.name,
              status: "pending",
              file: file,
            },
          ];
        });
      };
      reader.readAsDataURL(file);
    });
  }

  function deleteFile(id) {
    setFiles((currentFiles) => {
      return currentFiles.filter((file) => file.id !== id);
    });
  }

  const uploadFiles = () => {
    setFiles((currentFiles) => {
      return currentFiles.map((file) => {
        if (file.status === "pending") {
          return { ...file, status: "done" };
        }
        return file;
      });
    });
    console.log(files);
  };

  async function downloadFiles() {
    const zip = new JSZip();

    files.forEach((file) => {
      if (file.status === "done") {
        const blob = new Blob([file], { type: "application/pdf" });
        zip.file(`${file.name}.pdf`, blob);
      }
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "cvizard.zip");
  }

  const allFilesAreDone =
    files.every((file) => file.status === "done") && files.length > 0;
  const someFilesPending =
    files.some((file) => file.status !== "done") && files.length > 0;

  return (
    <section className="flex items-center justify-center min-h-screen w-full bg-white">
      <div className="mx-auto max-w-[43rem]">
        <Baner />
        <PdfFileList files={files} addFile={addFile} deleteFile={deleteFile} />

        <div className="flex items-center justify-center">
          {someFilesPending && (
            <TransferButton label="Upload files" transferFiles={uploadFiles} />
          )}
          {allFilesAreDone && (
            <TransferButton
              label="Download files"
              transferFiles={downloadFiles}
            />
          )}
        </div>
      </div>
    </section>
  );
}
