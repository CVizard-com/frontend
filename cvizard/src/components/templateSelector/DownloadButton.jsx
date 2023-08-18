import axios from "axios";
import JSZip, { forEach } from "jszip";
import { FilesContext } from "../../App";
import { useContext } from "react";
import { saveAs } from "file-saver";
import axiosRetry from "axios-retry";
import downloadFile from "../../images/downloadFile.png";
axiosRetry(axios, {
  retries: 50,
  retryDelay: (retryCount) => {
    return retryCount * 3000;
  },
  retryCondition: (error) => {
    return error.response.status !== 200;
  },
});

export function DownloadButton() {
  const { files, setFiles } = useContext(FilesContext);
  //-----------------DELETE----------------- duplicate
  const updateFileStatus = (id, newStatus) => {
    setFiles((currentFiles) => {
      return currentFiles.map((file) =>
        file.id === id ? { ...file, status: newStatus } : file
      );
    });
  };
  //----------------------------------
  function fetchFile({ file }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `https://localhost:8443/api/maker/download?key=${file.id}`,
          { responseType: "arraybuffer" }
        );

        if (response.status === 200) {
          updateFileStatus(file.id, "Done");
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
  function changeStatusAll(status) {
    setFiles((currentFiles) => {
      return currentFiles.map((file) => {
        return { ...file, status };
      });
    });
  }

  return (
    <>
      <button
        onClick={() => {
          changeStatusAll("Almost done");
          downloadFilesZip();
        }}
        className="flex flex-wrap items-center justify-center w-36 h-10 mx-auto rounded-lg bg-cyan-500 py-2 text-white transition-colors hover:bg-cyan-600 mt-12"
      >
        <img src={downloadFile} className="w-6 mx-1" />
        Download files
      </button>
    </>
  );
}
