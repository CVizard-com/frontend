import axios from "axios";
import axiosRetry from "axios-retry";

// export async function uploadFile({ file }) {
//   const formData = new FormData();
//   formData.append("pdf_file", file);
//   formData.append("id", file.id);
//   await axios.post("https://cvizard.com:8443/api/reader", formData);
// }

axiosRetry(axios, {
  retries: 300,
  retryDelay: (retryCount) => {
    return retryCount * 2000; // time interval between retries
  },
  retryCondition: (error) => {
    // if retry condition is not specified, by default idempotent requests are retried
    return error.response.status !== 200;
  },
});

export function uploadFile({ setFiles, file }) {
  return new Promise(async (resolve, reject) => {
    try {
      // Here you initiate the upload and wait for it to complete

      setFiles((currentFiles) => {
        return [
          ...currentFiles,
          {
            id: crypto.randomUUID(),
            name: file.name,
            status: "uploading",
            file: file,
          },
        ];
      });

      const formData = new FormData();
      formData.append("pdf_file", file.file);
      formData.append("id", file.id);

      const response = await axios.post(
        `https://cvizard.com:8443/api/reader`,
        formData
      );
      if (response.status === 200) {
        setFiles((currentFiles) => {
          return [
            ...currentFiles,
            {
              id: crypto.randomUUID(),
              name: file.name,
              status: "uploading",
              file: file,
            },
          ];
        });
        resolve(file);
      } else {
        setFiles((files) => {
          return [
            ...files,
            {
              id: file.id,
              name: file.name,
              status: "error",
              file: file.file,
            },
          ];
        });
        reject(new Error("File upload failed"));
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function processFile(props) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("jestem");
      const response = await axios.get(
        `https://cvizard.com:8443/api/maker/download?key=${file.id}`
      );

      if (response.status === 200) {
        setFiles((files) => {
          return [
            ...files,
            {
              id: file.id,
              name: file.name,
              status: "done",
              file: file.file,
            },
          ];
        });
        resolve(file);
      } else {
        setFiles((files) => {
          return [
            ...files,
            {
              id: file.id,
              name: file.name,
              status: "error",
              file: file.file,
            },
          ];
        });
        reject(new Error("File upload failed"));
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function download({ id }) {
  return await axios.get(
    `https://cvizard.com:8443/api/creator/download?key=${id}`
  );
}
