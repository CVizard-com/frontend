import React, { useContext } from "react";
import { FilesContext } from "../../App";
import trashBin from "../../images/thrashBin.png";
export function FormField({ file, field, fieldName }) {
  const { files, setFiles } = useContext(FilesContext);

  const deleteField = () => {
    setFiles((currentFiles) => {
      return currentFiles.map((mapFile) => {
        if (mapFile.id === file.id) {
          return {
            ...mapFile,
            fields: {
              ...mapFile.fields,
              [fieldName]: mapFile.fields[fieldName].filter(
                (mapField) => mapField.id !== field.id
              ),
            },
          };
        } else {
          return mapFile;
        }
      });
    });
  };

  const changeValue = (value) => {
    setFiles((currentFiles) => {
      return currentFiles.map((mapFile) => {
        if (mapFile.id === file.id) {
          return {
            ...mapFile,
            fields: {
              ...mapFile.fields,
              [fieldName]: mapFile.fields[fieldName].map((mapField) => {
                if (mapField.id === field.id) {
                  return { ...field, value: value };
                } else {
                  return mapField;
                }
              }),
            },
          };
        } else {
          return mapFile;
        }
      });
    });
  };

  return (
    <li className="flex items-center justify-center h-8">
      <input
        type="text"
        placeholder="text..."
        className="placeholder:italic focus:outline-none overflow-hidden"
        defaultValue={field.value}
        onBlur={(e) => changeValue(e.target.value)}
      />
      <button onClick={() => deleteField()}>
        <img src={trashBin} className="w-4" />
      </button>
    </li>
  );
}
