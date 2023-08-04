import React, { useContext } from "react";
import { FilesContext } from "../../App";
import { PDFViewer, Document } from "@react-pdf/renderer";

export function PdfPreview() {
  const { files, setFiles } = useContext(FilesContext);
  return (
    <div className="w-4/12 mx-4">
      <h3 className="text-center text-lg font-medium leading-8 text-cyan-500">
        Preview
      </h3>
      {/* <PDFViewer>
        <Document
          file={URL.createObjectURL(
            files.filter((file) => file.isActive)[0].file
          )}
        ></Document>
      </PDFViewer> */}
      {/* <object
        data={files.filter((file) => file.isActive)}
        type="application/pdf"
        className="w-full h-full rounded-lg rounded-lg border-2 border-slate-300"
      ></object> */}
    </div>
  );
}
