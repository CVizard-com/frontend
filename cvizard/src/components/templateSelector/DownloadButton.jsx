import axios from "axios";
import JSZip, { forEach } from "jszip";
import { FilesContext } from "../../App";
import { useContext } from "react";
import { saveAs } from "file-saver";
import axiosRetry from "axios-retry";
import downloadFile from "../../images/downloadFile.png";
import { TemplateContext } from "../../containers/TemplateSelector";

axiosRetry(axios, {
  retries: 5000,
  retryDelay: (retryCount) => {
    return retryCount * 3000;
  },
  retryCondition: (error) => {
    return error.response.status !== 200;
  },
});

export function DownloadButton() {
  const { templates, setTemplates } = useContext(TemplateContext);
  const { files, setFiles } = useContext(FilesContext);
  const template = templates.find((template) => template.isActive);
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
          `https://cvizard.com:8443/api/maker/download/${template.label}?key=${file.id}`,
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

  function findFileIndex(fileName) {
    return files.findIndex((file) => file.fileName === fileName);
  }

  // function findFileIndex(id) {
  //   return files.findIndex((file) => file.id === id);
  // }

  async function downloadFilesZip() {
    const myZip = new JSZip();
    const date = new Date();
    const downloadPromises = files.map(async (file) => {
      const content = await fetchFile({ file });
      myZip.file(`blank_cv_${findFileIndex(file.fileName) + 1}.pdf`, content);
    });

    try {
      await Promise.all(downloadPromises);
      const zipContent = await myZip.generateAsync({ type: "blob" });
      const formattedDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} at ${date.getHours()}.${date.getMinutes()}`;
      const zipFileName = `cvizard ${formattedDate}.zip`;
      saveAs(zipContent, zipFileName);
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
