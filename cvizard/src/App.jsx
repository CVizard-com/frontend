import { useState, useEffect, useRef } from "react";

import { AddFileButton } from "./AddFileButton";
import FileSaver from "file-saver";
import { Baner } from "./Baner";
import { PdfFileList } from "./PdfFileList";
import { TransferButton } from "./TransferButton";
import JSZip, { forEach } from "jszip";
import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: 300,
  retryDelay: (retryCount) => {
    return retryCount * 2000;
  },
  retryCondition: (error) => {
    return error.response.status !== 200;
  },
});

export default function App() {
  const [files, setFiles] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(files));
  }, [files]);

  const updateFileStatus = (id, newStatus) => {
    setFiles((currentFiles) => {
      return currentFiles.map((file) =>
        file.id === id ? { ...file, status: newStatus } : file
      );
    });
  };

  function addFile(acceptedFiles) {
    acceptedFiles.forEach((file) => {
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
        console.log("file_start", file);
      };
      reader.readAsDataURL(file);
    });
  }

  function deleteFile(id) {
    setFiles((currentFiles) => {
      return currentFiles.filter((file) => file.id !== id);
    });
  }

  function uploadFile({ file }) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("file", file);
        console.log("file_file", file.file);
        updateFileStatus(file.id, "uploading");

        const formData = new FormData();
        formData.append("pdf_file", file.file);
        formData.append("id", file.id);

        const response = await axios.post(
          `https://cvizard.com:8443/api/reader`,
          formData
        );
        if (response.status === 200) {
          updateFileStatus(file.id, "processing");
          resolve(file);
        } else {
          updateFileStatus(file.id, "error");
          reject(new Error("File upload failed"));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  function processFile({ file }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `https://cvizard.com:8443/api/maker/download?key=${file.id}`
        );

        if (response.status === 200) {
          updateFileStatus(file.id, "done");
          resolve(file);
        } else {
          updateFileStatus(file.id, "error");
          reject(new Error("File upload failed"));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async function uploadFiles() {
    const uploadPromises = files.map((file) => {
      if (file.status !== "pending") return Promise.resolve();
      return uploadFile({ file });
    });

    const processPromises = files.map((file) => {
      return processFile({ file });
    });

    try {
      await Promise.all(uploadPromises);
      await Promise.all(processPromises);
    } catch (error) {
      console.error("Error while uploading files", error);
    }
  }

  function fetchFile({ file }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `https://cvizard.com:8443/api/maker/download?key=${file.id}`,
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

  async function downloadFilesZip() {
    const myZip = new JSZip();
    const downloadPromises = files.map(async (file) => {
      const content = await fetchFile({ file });
      myZip.file(file.name, content);
    });
  
    try {
      await Promise.all(downloadPromises);
      const zipContent = await myZip.generateAsync({ type: "blob" });
      saveAs(zipContent, "cvizard.zip");
    } catch (error) {
      console.error("Error while downloading files", error);
    }
  }
  
  const allFilesAreDone =
    files.every((file) => file.status === "done") && files.length > 0;
  const someFilesPending =
    files.some((file) => file.status !== "done") && files.length > 0;

  return (
    <section className="flex items-center justify-center min-h-screen w-full bg-white">
      <div className="mx-auto max-w-[43rem]">
        <Baner />
        <PdfFileList files={files} addFile={addFile} deleteFile={deleteFile} uploadFile={uploadFile} fetchFile={fetchFile} />

        <AddFileButton addFile={addFile} />

        <div className="flex items-center justify-center">
          {someFilesPending && (
            <TransferButton label="Upload files" transferFiles={uploadFiles} />
          )}
          {allFilesAreDone && (
            <TransferButton
              label="Download files"
              transferFiles={downloadFilesZip}
            />
          )}
        </div>
      </div>
    </section>
  );
}
