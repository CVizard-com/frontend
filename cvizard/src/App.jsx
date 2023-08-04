import { useState, useEffect, useRef, createContext } from "react";
import JSZip, { forEach } from "jszip";

import { PdfUploader } from "./containers/PdfUploader";
import { DataForm } from "./containers/DataForm";

export const FilesContext = createContext();

export default function App() {
  const [files, setFiles] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(files));
  }, [files]);

  function processFile({ file }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `https://cvizard.com:8443/api/maker/download?key=${file.id}`
        );

        if (response.status === 200) {
          updateFileStatus(file.id, "Download");
          resolve(file);
        } else {
          reject(new Error("File upload failed"));
        }
      } catch (error) {
        reject(error);
      }
    });
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
      myZip.file(file.fileName, content);
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
    files.every((file) => file.status === "Download") && files.length > 0;
  const allFilesUploaded =
    files.every((file) => file.status === "Uploaded") && files.length > 0;

  return (
    // <section className="flex items-center justify-center min-h-screen w-full bg-white">
    //   <div className="mx-auto max-w-[43rem]">
    //     <Baner />
    //     <PdfFileList
    //       files={files}
    //       addFile={addFile}
    //       deleteFile={deleteFile}
    //       uploadFile={uploadFile}
    //       fetchFile={fetchFile}
    //     />

    //     <AddFileButton addFile={addFile} />

    //     <div className="flex items-center justify-center">
    //       {someFilesPending && (
    //         <TransferButton label="Upload files" transferFiles={uploadFiles} />
    //       )}
    //       {allFilesAreDone && (
    //         <TransferButton
    //           label="Download files"
    //           transferFiles={downloadFilesZip}
    //         />
    //       )}
    //     </div>
    //   </div>
    // </section>
    <FilesContext.Provider value={{ files, setFiles }}>
      <PdfUploader />
      {allFilesUploaded && <DataForm />}
    </FilesContext.Provider>
  );
}
