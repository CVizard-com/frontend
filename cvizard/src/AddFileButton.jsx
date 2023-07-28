import React from "react";
import { useDropzone } from "react-dropzone";

export function AddFileButton({ addFile }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: addFile,
  });

  return (
    <div
      {...getRootProps()}
      className="w-8/12 flex justify-center items-center text-base leading-relaxed rounded-md px-5 py-3 transition-colors hover:bg-slate-100 text-cyan-500 border-2 border-slate-300 mx-auto my-4"
    >
      <input {...getInputProps()} accept="application/pdf" />
      <p className="text-center">
        Drag and drop some files here, or click to select files
      </p>
    </div>
  );
}
