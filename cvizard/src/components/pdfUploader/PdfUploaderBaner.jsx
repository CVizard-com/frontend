import React, { useContext, useEffect } from "react";
import { FilesContext } from "../../App";

export function PdfUploaderBaner() {
  const { files, setFiles } = useContext(FilesContext);
  useEffect(() => {}, [files]);

  return (
    <div className="text-center">
      {/* <p className="text-lg font-medium leading-8 text-cyan-500">
        Introducing CVizard
      </p> */}
      <h1 className="my-8 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black">
        Anonymize and convert <u>any</u> CV
      </h1>

      <p className="text-lg text-xl leading-8 text-cyan-500 mb-8">
        Drag and drop files or click the button below to add files
      </p>
    </div>
  );
}
