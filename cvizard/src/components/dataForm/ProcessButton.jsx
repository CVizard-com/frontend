import { FilesContext } from "../../App";
import { createContext, useContext, useEffect, useState } from "react";
// import { FetchingContext } from "../../containers/DataForm";
import axios from "axios";
import axiosRetry from "axios-retry";
import { FetchingContext } from "../../App";
axiosRetry(axios, {
  retries: 5,
  retryDelay: (retryCount) => {
    return retryCount * 2000;
  },
  retryCondition: (error) => {
    return error.response.status !== 200;
  },
});

export function ProcessButton({ activeFile }) {
  const { files, setFiles } = useContext(FilesContext);
  const { fetchingData, setFetchingData } = useContext(FetchingContext);
  function toggleActive(id) {
    setFiles((currentFiles) => {
      return currentFiles.map((file) =>
        file.id === id
          ? { ...file, isActive: !file.isActive }
          : { ...file, isActive: false }
      );
    });
  }

  const getCurrentIndex = () => {
    return files.findIndex((file) => file === activeFile);
  };

  const getNextItem = () => {
    const currentIndex = getCurrentIndex();
    const nextIndex = (currentIndex + 1) % files.length;
    return files[nextIndex];
  };
  //-----------------DELETE----------------- duplicate
  const updateFileStatus = (id, newStatus) => {
    setFiles((currentFiles) => {
      return currentFiles.map((file) =>
        file.id === id ? { ...file, status: newStatus } : file
      );
    });
  };
  //----------------------------------

  async function handleNextItem() {
    const nextFile = getNextItem();
    toggleActive(nextFile.id);
    // //---------DELETE----------------
    // const json = {
    //   id: nextFile.id.toString(),
    //   text: "Johnnie Ramos johnnie.ramos@gmail.com 708-678-627 Warsaw, Poland, Education 2015/10 – 2020/05 London, UK Languages Polish C2 A-Level Degree Abbey DLD College London Spanish B1 Certificates Certified Customer Service Professional (CCSP) 2016/10 Professional Experience 2020/01 – present 2019/08 – 2019/12 Projects 2022/01 – 2022/11 Skills Spring Boot Docker python IT Supervisor NextGen Information Research, identify and appraise emerging technologies, hardware, and software to provide strategic recommendations for continuous improvements IT Specialist INITAR Inc. Oversaw more than 200 computers of the company by monitoring, configuring, and maintaining all hardware and software systems",
    // };
    // await axios.post("http://localhost:8082/test", json);
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
  async function postCleanedData() {
    const body = {
      id: activeFile.id,
      name: activeFile.fields.name.map((field) => field.value),
      address: activeFile.fields.address.map((field) => field.value),
      phone: activeFile.fields.phone.map((field) => field.value),
      url: activeFile.fields.website.map((field) => field.value),
      email: activeFile.fields.email.map((field) => field.value),
      other: activeFile.fields.other.map((field) => field.value),
    };
    await axios.post("https://cvizard.com:8443/api/cleaner/upload", body);
    updateFileStatus(activeFile.id, "Processing");
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-20">
      <button
        onClick={() => {
          postCleanedData();
          if (activeFile !== files[files.length - 1]) {
            handleNextItem(); //TODO if file is last, then skip handleNextItem
            setFetchingData(true);
          }
        }}
        className="flex flex-wrap items-center w-full justify-center w-36 mx-auto rounded-lg bg-cyan-500 py-2 text-white transition-colors hover:bg-cyan-600 my-2 mx-10"
      >
        {/* <img src="../../images/process.png " className="w-5 mx-4" /> */}
        //TODO add image Process
      </button>
    </div>
  );
}
