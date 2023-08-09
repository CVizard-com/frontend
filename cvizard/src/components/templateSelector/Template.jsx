import React, { useContext, useRef } from "react";
import { TemplateContext } from "../../containers/TemplateSelector";

export function Template({ template }) {
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
      {/* <button
        onClick={() => toggleActiveTemplate(template.id)}
        className={`${
          template.isActive ? "border-8 border-cyan-500" : "border-slate-300"
        } shrink-0 h-96 w-72 rounded-lg border-2 mx-12`}
      > */}
      <img
        src={`../../images/templates/template${template.id}.png`}
        alt="template image"
        className={`${
          template.isActive ? "border-8 border-cyan-500" : "border-slate-300"
        } shrink-0 h-96 w-72 rounded-lg border-2 mx-12`}
        onClick={() => selectTemplateRef.current.click()}
      />
      <button
        onClick={() => toggleActiveTemplate(template.id)}
        className="hidden"
        ref={selectTemplateRef}
      />
      {/* </button> */}
    </>
  );
}
