import { DataFormBaner } from "../components/dataForm/DataFormBaner";
import { FormList } from "../components/dataForm/FormList";
import { PdfPreviewComponent } from "../components/dataForm/PdfPreviewComponent";
import { createContext, useContext, useEffect, useState } from "react";
import { Form } from "../components/dataForm/Form";
import { FilesContext } from "../App";

export const FormContext = createContext();

export function DataForm() {
  const [formData, setFormData] = useState([{ id: "", name: "", value: "" }]);
  const { files, setFiles } = useContext(FilesContext);
  const activeFile = files.find((file) => file.isActive);

  return (
    <div className="flex flex-wrap justify-center relative min-h-screen w-full bg-white">
      <FormContext.Provider value={{ formData, setFormData }}>
        <DataFormBaner />
        <Form file={activeFile} />
        <PdfPreviewComponent file={activeFile} />
      </FormContext.Provider>
    </div>
  );
}
