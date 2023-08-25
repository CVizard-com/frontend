import React, { useContext } from "react";
import {
  TemplateContext,
  FormatContext,
} from "../../containers/TemplateSelector";
import { Template } from "./Template";
import { Format } from "./Format";

export function Selector() {
  const { templates, setTemplates } = useContext(TemplateContext);
  const { formats, setFormats } = useContext(FormatContext);

  return (
    <>
      <p className="w-full mx-auto text-center text-lg mb-2 font-bold">
        Language
      </p>
      <div className="flex items-center w-80 h-16 mx-auto mb-8 rounded-lg border-2 border-slate-300">
        {templates.map((template) => (
          <Template
            key={template.id}
            template={template}
            label={template.label}
          />
        ))}
      </div>
      <p className="w-full mx-auto text-center text-lg mb-2 font-bold">
        Format
      </p>
      <div className="flex items-center w-80 h-16 mx-auto mb-8 rounded-lg border-2 border-slate-300">
        {formats.map((format) => (
          <Format key={format.id} format={format} label={format.label} />
        ))}
      </div>
      {/* <div className="flex items-center min-h-[60vh] rounded-lg border-2 border-slate-300 mx-24 overflow-x-auto">
        {templates.map((template) => (
          <Template
            key={template.id}
            template={template}
            label={template.label}
          />
        ))}
      </div> */}
    </>
  );
}
