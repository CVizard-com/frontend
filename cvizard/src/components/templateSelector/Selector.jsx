import React, { useContext } from "react";
import { TemplateContext } from "../../containers/TemplateSelector";
import { Template } from "./Template";
export function Selector() {
  const { templates, setTemplates } = useContext(TemplateContext);

  return (
    <>
      <div className="flex items-center min-h-[60vh] rounded-lg border-2 border-slate-300 mx-24 overflow-x-auto">
        {templates.map((template) => (
          <Template
            key={template.id}
            template={template}
            label={template.label}
          />
        ))}
      </div>
    </>
  );
}
