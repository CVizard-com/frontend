import React, { useRef } from "react";
export function AddFileButton({ addFile }) {
  const fileInputRef = useRef();
  return (
    <>
      <button
        type="file"
        onClick={() => fileInputRef.current.click()}
        accept="application/pdf"
        className="rounded-md bg-cyan-500 px-5 py-3 font-medium text-white transition-colors hover:bg-cyan-600 my-2"
      >
        Add files
      </button>
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={addFile}
        multiple
      />
    </>
  );
}
