import React, { useEffect, useState } from "react";

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

export function PdfPreviewComponent({ file }) {
  const isFilePdf = file?.file.type === "application/pdf";

  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    isFilePdf ? setPdf(file) : getPdfFromDocx({ file });
  }, [file]);

  function getPdfFromDocx({ file }) {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append("files", file.file);

        const response = await axios.post(
          `https://cvizard.com:8443/forms/libreoffice/convert`,
          formData,
          {
            responseType: "arraybuffer",
          }
        );
        if (response.status === 200) {
          const blob = new Blob([response.data], {
            type: "application/pdf",
          });
          setPdf({ ...file, file: blob });
          resolve(blob);
        } else {
          reject(new Error("Get pdf from docx failed"));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  return (
    <>
      <div className="w-4/12 pb-8 px-8 h-5/6">
        <h3 className="w-full px-8 mx-auto text-left font-medium text-cyan-500">
          Preview
        </h3>
        {pdf && (
          <iframe
            className="flex items-center justify-center rounded-lg border-2 border-slate-300 h-[600px] w-full"
            src={URL.createObjectURL(pdf.file)}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        )}
      </div>
    </>
  );
}
