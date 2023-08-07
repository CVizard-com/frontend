import React, { useContext } from "react";
import { FormContext } from "../../containers/DataForm";

export function FormField({ field }) {
  const { formData, setFormData } = useContext(FormContext);

  function deleteField(id) {
    setFormData((currentFormData) => {
      return currentFormData.filter((formData) => formData.id !== id);
    });
  }
  return (
    <li className="flex items-center justify-center h-8">
      <input
        type="text"
        placeholder="text..."
        className="placeholder:italic focus:outline-none overflow-hidden"
        defaultValue={field.value}
      />
      <button onClick={() => deleteField(field.id)}>
        <img src="../../images/thrashBin.png" className="w-4" />
      </button>
    </li>
  );
}
