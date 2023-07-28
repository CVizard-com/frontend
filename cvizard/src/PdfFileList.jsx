import { PdfFile } from "./PdfFile";

export function PdfFileList({ files, deleteFile, fetchFile }) {
  return (
    <div className="flex items-center justify-center">
      {files.length > 0 ? (
        <ul
          role="list"
          className="divide-y divide-slate-100 w-8/12 max-h-64 overflow-auto rounded-md border-2 border-slate-300"
        >
          {files.length === 0}
          {files.map((file) => {
            return <PdfFile file={file} deleteFile={deleteFile} fetchFile={fetchFile}/>;
          })}

          {files.filter((file) => file.status === "pending").length ===
            files.length && files.length > 0}
        </ul>
      ) : null}
    </div>
  );
}
