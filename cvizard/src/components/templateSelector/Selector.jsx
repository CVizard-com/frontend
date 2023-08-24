import React, { useContext } from "react";
import { TemplateContext } from "../../containers/TemplateSelector";
import { Template } from "./Template";
export function Selector() {
  const { templates, setTemplates } = useContext(TemplateContext);

  return (
    <>
      <div className="flex items-center w-80 h-16 mx-auto my-12 rounded-lg border-2 border-slate-300">
        {templates.map((template) => (
          <Template
            key={template.id}
            template={template}
            label={template.label}
          />
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
