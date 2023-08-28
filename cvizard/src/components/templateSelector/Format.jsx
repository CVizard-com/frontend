import React, { useContext, useRef } from "react";
import { FormatContext } from "../../containers/TemplateSelector";

export function Format({ format }) {
  const { formats, setFormats } = useContext(FormatContext);
  const selectFormatRef = useRef();

  function toggleActiveFormat(id) {
    setFormats((currentFormats) => {
      return currentFormats.map((format) =>
        format.id === id
          ? { ...format, isActive: true }
          : { ...format, isActive: false }
      );
    });
  }

  return (
    <>
      <button
        onClick={() => toggleActiveFormat(format.id)}
        className={`${
          format.isActive
            ? "bg-cyan-100 hover:bg-cyan-200"
            : "hover:bg-slate-100"
        } flex items-center justify-center w-6/12 h-full rounded-lg`}
      >
        {format.label.toUpperCase()}
      </button>
      <button
        onClick={() => toggleActiveFormat(format.id)}
        className="hidden"
        ref={selectFormatRef}
      />
    </>
  );
}
