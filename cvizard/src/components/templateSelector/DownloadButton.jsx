import axios from "axios";
import JSZip, { forEach } from "jszip";
import { FilesContext } from "../../App";
import { useContext } from "react";
import { saveAs } from "file-saver";
import axiosRetry from "axios-retry";
import downloadFile from "../../images/downloadFile.png";
import {
  TemplateContext,
  FormatContext,
} from "../../containers/TemplateSelector";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const { formats, setFormats } = useContext(FormatContext);
  const { files, setFiles } = useContext(FilesContext);
  const template = templates.find((template) => template.isActive);
  const format = formats.find((format) => format.isActive);
  //-----------------DELETE----------------- duplicate
  const updateFileStatus = (id, newStatus) => {
    setFiles((currentFiles) => {
      return currentFiles.map((file) =>
        file.id === id ? { ...file, status: newStatus } : file
      );
    });
  };
  //----------------------------------
  const notifyTemplateError = () => {
    toast.error("No template selected", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  function fetchFile({ file }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `https://cvizard.com:8443/api/maker/download?key=${file.id}&template=${template.label}&format=${format.label}`,
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

  async function downloadFilesZip() {
    const myZip = new JSZip();
    const downloadPromises = files.map(async (file) => {
      const content = await fetchFile({ file });
      myZip.file(
        `blank_cv_${findFileIndex(file.fileName) + 1}.${format.label}`,
        content
      );
    });

    try {
      await Promise.all(downloadPromises);
      const date = new Date();
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
          if (template === undefined) {
            notifyTemplateError();
          } else {
            changeStatusAll("Almost done");
            downloadFilesZip();
          }
        }}
        className="flex flex-wrap items-center justify-center w-40 h-10 mx-auto rounded-lg bg-cyan-500 py-2 text-white transition-colors hover:bg-cyan-600 mt-8"
      >
        <img src={downloadFile} className="w-6 mx-1" />
        Download files
      </button>
    </>
  );
}
