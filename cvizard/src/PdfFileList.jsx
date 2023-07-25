import { PdfFile } from "./PdfFile";
import { AddFileButton } from "./AddFileButton";
export function PdfFileList({ files, addFile, deleteFile }) {
  return (
    <div className="flex items-center justify-center">
      {files.length > 0 ? (
        <ul
          role="list"
          className="divide-y divide-slate-100 w-6/12 max-h-64 overflow-auto rounded-md border-2 border-slate-300"
        >
          {files.length === 0}
          {files.map((file) => {
            return <PdfFile {...file} key={file.id} deleteFile={deleteFile} />;
          })}

          {files.filter((file) => file.status === "pending").length ===
            files.length &&
            files.length > 0 && (
              <li className="flex justify-center bg-white sticky bottom-0">
                <AddFileButton addFile={addFile} />
              </li>
            )}
        </ul>
      ) : (
        <>
          <AddFileButton addFile={addFile} />
        </>
      )}
    </div>
  );
}
