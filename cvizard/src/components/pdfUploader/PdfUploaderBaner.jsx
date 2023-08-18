import React, { useContext, useEffect } from "react";
import { FilesContext } from "../../App";

export function PdfUploaderBaner() {
  const { files, setFiles } = useContext(FilesContext);
  useEffect(() => {}, [files]);

  const isFilesUploaded = files.some((file) => file.status === "Uploaded");
  const isFilesProcessing = files.some((file) => file.status === "Processing");
  const isFilesAlmostDone = files.some((file) => file.status === "Almost done");
  const isFilesDone = files.some((file) => file.status === "Done");
  return (
    <div className="text-center">
      {/* <p className="text-lg font-medium leading-8 text-cyan-500">
        Introducing CVizard
      </p> */}
      <h1 className="my-8 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black">
        Anonymize and convert <u>any</u> CV
      </h1>

      <p className="text-lg text-xl leading-8 text-cyan-500 mb-8">
        {isFilesUploaded
          ? "Ensure private data is not shared"
          : isFilesAlmostDone
          ? "Keep waiting, we are processing your files, after all it will download automatically, we need +/- 10s for each file, be patient😃"
          : isFilesProcessing
          ? "Choose the template for your files"
          : isFilesDone
          ? "This is the end of our journey, it's over, now it's time to download your files"
          : "Drag and drop files or click the button below to add files"}
      </p>
    </div>
  );
}
