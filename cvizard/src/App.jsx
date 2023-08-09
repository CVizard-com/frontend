import { useState, useEffect, useRef, createContext } from "react";
import JSZip, { forEach } from "jszip";
import { Element, scroller } from "react-scroll";
import { PdfUploader } from "./containers/PdfUploader";
import { DataForm } from "./containers/DataForm";
import { TemplateSelector } from "./containers/TemplateSelector";

export const FilesContext = createContext();

export default function App() {
  const [files, setFiles] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  // useEffect(() => {
  //   localStorage.setItem("ITEMS", JSON.stringify(files));
  // }, [files]);

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
  function changeStatusAll(status) {
    setFiles((currentFiles) => {
      return currentFiles.map((file) => {
        return { ...file, status };
      });
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

  const allFilesUploaded =
    files.every((file) => file.status === "Uploaded") && files.length > 0;

  const allFilesAreDone =
    files.every((file) => file.status === "Processing") && files.length > 0;

  useEffect(() => {
    if (allFilesUploaded) {
      toggleActive(files[0].id);
      scroller.scrollTo("DataFormElement", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, [allFilesUploaded]);

  useEffect(() => {
    if (allFilesAreDone) {
      scroller.scrollTo("TemplateSelectorElement", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, [allFilesAreDone]);

  return (
    <FilesContext.Provider value={{ files, setFiles }}>
      <PdfUploader allFilesUploaded={allFilesUploaded} />
      {allFilesUploaded && (
        <Element name="DataFormElement">
          <DataForm />
        </Element>
      )}
      {allFilesAreDone && (
        <Element name="TemplateSelectorElement">
          <TemplateSelector />
        </Element>
      )}
      <button onClick={() => changeStatusAll("Processing")}>Processing</button>
      <button onClick={() => changeStatusAll("Uploaded")}>Uploaded</button>
    </FilesContext.Provider>
  );
}
