import { FormField } from "./FormField";
import React, { useContext } from "react";
import { FormContext } from "../../containers/DataForm";

export function FormList({ name }) {
  const { formData, setFormData } = useContext(FormContext);

  function addField(value) {
    setFormData((currentFormData) => {
      return [
        ...currentFormData,
        {
          id: crypto.randomUUID(),
          name: name,
          value: value,
        },
      ];
    });
  }
  const filteredData = formData.filter((field) => field.name === name);
  return (
    // <div className="flex flex-wrap content-start justify-center w-8/12 h-36">
    //   <p className="w-full px-8 mx-auto text-left font-medium text-cyan-500">
    //     {name}
    //   </p>
    //   <div className="flex flex-wrap items-center justify-center w-full mx-auto rounded-lg border-2 border-slate-300 overflow-hidden">
    //     {filteredData.length !== 0 && (
    //       <ul
    //         role="list"
    //         className="divide-y-2 divide-slate-300 w-full max-h-28 overflow-hidden overflow-y-scroll border-b-2 border-slate-300"
    //       >
    //         {filteredData.map((field) => {
    //           return <FormField key={field.id} field={field} />;
    //         })}
    //       </ul>
    //     )}

    //     <button
    //       className="flex items-center w-full px-8 text-left text-slate-400 hover:bg-slate-100"
    //       onClick={() => addField()}
    //     >
    //       <img src="../../images/plus.png" className="w-4" />
    //       Add field
    //     </button>
    //   </div>
    // </div>
    <div className="flex flex-col items-center justify-center w-full px-20 h-full">
      <p className="w-full px-8 mx-auto text-left font-medium text-cyan-500">
        {name}
      </p>
      <div className="absolute top-0 relative h-36 items-center justify-center w-full mx-auto rounded-lg border-2 border-slate-300 overflow-hidden">
        {filteredData.length !== 0 && (
          <ul
            role="list"
            className="h-28 mt-auto divide-y-2 divide-slate-300 w-full max-h-32 overflow-hidden overflow-y-scroll"
          >
            {filteredData.map((field) => {
              return <FormField key={field.id} field={field} className="h-8" />;
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
