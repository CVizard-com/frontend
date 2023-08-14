import { useState, useEffect, useRef, createContext } from "react";
import JSZip, { file, forEach } from "jszip";
import { Element, scroller } from "react-scroll";
import { PdfUploader } from "./containers/PdfUploader";
import { DataForm } from "./containers/DataForm";
import { TemplateSelector } from "./containers/TemplateSelector";
import axios from "axios";

export const FilesContext = createContext();
export const FetchingContext = createContext();
export const SiteStatusContext = createContext();
export default function App() {
  const [files, setFiles] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  const [fetchingData, setFetchingData] = useState(true); //TODO wyjebac do dataForm
  const [siteStatus, setSiteStatus] = useState(
    "Drag and drop files or click the button below to add files"
  );

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
          ? { ...file, isActive: true } //TODO zmienic na !file.isActive
          : { ...file, isActive: false }
      );
    });
  }

  const allFilesUploaded =
    files.every((file) => file.status === "Uploaded") && files.length > 0;

  const allFilesAreDone =
    files.every((file) => file.status === "Processing") && files.length > 0;

  const someFilesAreUploaded =
    files.some((file) => file.status === "Uploaded") && files.length > 0;

  //TODO duplicate
  async function handleNextItem() {
    const nextFile = files[0];
    toggleActive(nextFile.id);
    // //---------DELETE----------------
    // const json = {
    //   id: nextFile.id.toString(),
    //   text: "Johnnie Ramos johnnie.ramos@gmail.com 708-678-627 Warsaw, Poland, Education 2015/10 – 2020/05 London, UK Languages Polish C2 A-Level Degree Abbey DLD College London Spanish B1 Certificates Certified Customer Service Professional (CCSP) 2016/10 Professional Experience 2020/01 – present 2019/08 – 2019/12 Projects 2022/01 – 2022/11 Skills Spring Boot Docker python IT Supervisor NextGen Information Research, identify and appraise emerging technologies, hardware, and software to provide strategic recommendations for continuous improvements IT Specialist INITAR Inc. Oversaw more than 200 computers of the company by monitoring, configuring, and maintaining all hardware and software systems",
    // };
    // await axios.post("https://cvizard.com:8443/api/cleaner/test", json);
    // //-----------------
    const response = await axios.get(
      `https://cvizard.com:8443/api/cleaner/cleaned?item_uuid=${nextFile.id}`
    );
    if (response.status === 200) {
      setFiles((currentFiles) => {
        return currentFiles.map((file) => {
          setFetchingData(false);

          if (file.id === response.data.id) {
            return {
              ...file,
              fields: {
                ["name"]: response.data.name.map((field) => {
                  return { id: crypto.randomUUID(), value: field };
                }),
                ["address"]: response.data.address.map((field) => {
                  return { id: crypto.randomUUID(), value: field };
                }),
                ["phone"]: response.data.phone.map((field) => {
                  return { id: crypto.randomUUID(), value: field };
                }),
                ["website"]: response.data.url.map((field) => {
                  return { id: crypto.randomUUID(), value: field };
                }),
                ["email"]: response.data.email.map((field) => {
                  return { id: crypto.randomUUID(), value: field };
                }),
                ["other"]: response.data.other.map((field) => {
                  return { id: crypto.randomUUID(), value: field };
                }),
              },
            };
          } else {
            return file;
          }
        });
      });
    }
  }
  useEffect(() => {
    if (allFilesUploaded) {
      toggleActive(files[0].id);

      handleNextItem();

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
    <FetchingContext.Provider value={{ fetchingData, setFetchingData }}>
      <FilesContext.Provider value={{ files, setFiles }}>
        <PdfUploader allFilesUploaded={allFilesUploaded} />
        {someFilesAreUploaded && (
          <Element name="DataFormElement">
            <DataForm />
          </Element>
        )}
        {allFilesAreDone && (
          <Element name="TemplateSelectorElement">
            <TemplateSelector />
          </Element>
        )}
      </FilesContext.Provider>
    </FetchingContext.Provider>
  );
}
