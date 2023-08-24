import React, { useContext, useRef } from "react";
import { TemplateContext } from "../../containers/TemplateSelector";
import template1 from "../../images/templates/template1.png";
import template2 from "../../images/templates/template2.png";
import template3 from "../../images/templates/template3.png";
import template4 from "../../images/templates/template4.png";

export function Template({ template }) {
  // const templatesIcons = [template1, template2, template3, template4];
  const { templates, setTemplates } = useContext(TemplateContext);

  const selectTemplateRef = useRef();
  function toggleActiveTemplate(id) {
    setTemplates((currentTemplates) => {
      return currentTemplates.map((template) =>
        template.id === id
          ? { ...template, isActive: !template.isActive }
          : { ...template, isActive: false }
      );
    });
  }

  return (
    <>
      <button
        onClick={() => toggleActiveTemplate(template.id)}
        className={`${
          template.isActive
            ? "bg-cyan-100 hover:bg-cyan-200"
            : "hover:bg-slate-100"
        } flex items-center justify-center w-6/12 h-full rounded-lg`}
      >
        {template.label}
      </button>
      {/* <button
        onClick={() => toggleActiveTemplate(template.id)}
        className={`${
          template.isActive ? "border-8 border-cyan-500" : "border-slate-300"
        } shrink-0 h-96 w-72 rounded-lg border-2 mx-12`}
      >
        {template.label}
      </button> */}
      <button
        onClick={() => toggleActiveTemplate(template.id)}
        className="hidden"
        ref={selectTemplateRef}
      />
      {/* </button> */}
    </>
  );
}
