import { FormField } from "./FormField";
import React, { useContext } from "react";
import { FilesContext } from "../../App";

export function FormList({ fieldName, file }) {
  // const { formData, setFormData } = useContext(FormContext);
  const { files, setFiles } = useContext(FilesContext);

  const addField = () => {
    setFiles((currentFiles) => {
      return currentFiles.map((mapFile) => {
        if (mapFile.id === file.id) {
          return {
            ...mapFile,
            fields: {
              ...mapFile.fields,
              [fieldName]: [
                ...mapFile.fields[fieldName],
                { id: crypto.randomUUID(), value: "" },
              ],
            },
          };
        } else {
          return mapFile;
        }
      });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-20 h-full pb-6">
      <p className="w-full px-8 mx-auto text-left font-medium text-cyan-500">
        {fieldName}
      </p>
      <div className="top-0 relative h-36 items-center justify-center w-full mx-auto rounded-lg border-2 border-slate-300 overflow-hidden">
        {file.fields[fieldName].length !== 0 && (
          <ul
            role="list"
            className="h-28 mt-auto divide-y-2 divide-slate-300 w-full max-h-32 overflow-hidden overflow-y-scroll"
          >
            {file.fields[fieldName].map((field) => {
              return (
                <FormField
                  key={field.id}
                  file={file}
                  field={field}
                  fieldName={fieldName}
                  className="h-8"
                />
              );
            })}
          </ul>
        )}

        <button
          className="bg-white h-8 absolute bottom-0 flex items-center w-full px-8 text-left text-slate-400 hover:bg-slate-100 border-t-2 border-slate-300"
          onClick={() => addField()}
        >
          <img src="../../images/plus.png" className="w-4 mx-2" />
          Add field
        </button>
      </div>
    </div>
  );
}
