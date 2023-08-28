import React, { useContext, useEffect } from "react";
import { FilesContext } from "../../App";

export function PdfUploaderBaner() {
  const { files, setFiles } = useContext(FilesContext);
  useEffect(() => {}, [files]);

  const allFilesAlmostDone =
    files.some((file) => file.status === "Almost done") && files.length > 0;
  

  const allFilesDone =
    files.every((file) => file.status === "Done") && files.length > 0;

  return (
    <div className="text-center">
      {/* <p className="text-lg font-medium leading-8 text-cyan-500">
        Introducing CVizard
      </p> */}
      <h1 className="my-8 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black">
        Anonymize and convert <u>any</u> CV
      </h1>

      <p className="text-xl leading-8 text-cyan-500 mb-8">
        {allFilesAlmostDone
          ? "We are processing your files, it make take few moments. Then it will download automatically."
          : allFilesDone
          ? "Process completed. Thank you for using CVizard"
          : "Drag and drop files or click the button below to add files"}
      </p>
    </div>
  );
}
