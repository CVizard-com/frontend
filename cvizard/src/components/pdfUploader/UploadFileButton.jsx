import React, { useContext } from "react";
import { FilesContext } from "../../App";

import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: 5,
  retryDelay: (retryCount) => {
    return retryCount * 2000;
  },
  retryCondition: (error) => {
    return error.response.status !== 200;
  },
});

export function UploadFileButton() {
  const { files, setFiles } = useContext(FilesContext);

  const updateFileStatus = (id, newStatus) => {
    setFiles((currentFiles) => {
      return currentFiles.map((file) =>
        file.id === id ? { ...file, status: newStatus } : file
      );
    });
  };

  function uploadFile({ file }) {
    return new Promise(async (resolve, reject) => {
      try {
        updateFileStatus(file.id, "Uploading");

        const formData = new FormData();
        formData.append("pdf_file", file.file);
        formData.append("id", file.id);

        const response = await axios.post(
          `https://cvizard.com:8443/api/reader`,
          formData
        );
        if (response.status === 200) {
          updateFileStatus(file.id, "Uploaded");
          resolve(file);
        } else {
          reject(new Error("File upload failed"));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async function uploadFiles() {
    //---------DELETE----------------
    files.forEach((file) => {
      const json = {
        id: file.id.toString(),
        text: "Johnnie Ramos johnnie.ramos@gmail.com 708-678-627 Warsaw, Poland, Education 2015/10 – 2020/05 London, UK Languages Polish C2 A-Level Degree Abbey DLD College London Spanish B1 Certificates Certified Customer Service Professional (CCSP) 2016/10 Professional Experience 2020/01 – present 2019/08 – 2019/12 Projects 2022/01 – 2022/11 Skills Spring Boot Docker python IT Supervisor NextGen Information Research, identify and appraise emerging technologies, hardware, and software to provide strategic recommendations for continuous improvements IT Specialist INITAR Inc. Oversaw more than 200 computers of the company by monitoring, configuring, and maintaining all hardware and software systems",
      };

      axios.post("http://localhost:8082/test", json);
    });

    //-----------------
    const uploadPromises = files.map((file) => {
      if (file.status !== "Pending") return Promise.resolve();
      return uploadFile({ file });
    });

    try {
      await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error while uploading files", error);
    }
  }

  return (
    <button
      onClick={uploadFiles}
      className="flex flex-wrap items-center justify-center w-36 h-10 mx-auto rounded-lg bg-cyan-500 py-2 text-white transition-colors hover:bg-cyan-600 my-2"
    >
      <img src="../../images/uploadFileIcon.png " className="w-6 mx-1" />
      Upload files
    </button>
  );
}
