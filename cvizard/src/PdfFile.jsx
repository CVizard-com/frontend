async function downloadOneFile({ file, fetchFile }) {
  try {
    const pdfData = await fetchFile({ file });
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    saveAs(pdfBlob, file.name);
  } catch (error) {
    console.error("Error while downloading file", error);
  }
}

export function PdfFile({ file, deleteFile, fetchFile }) {
  return (
    <>
      <li className="grid grid-cols-4 gap-4 py-3 w-full px-4 h-12">
        <p className="col-span-2 text-sm font-semibold leading-6 text-gray-900 overflow-hidden ">
          {file.name}
        </p>
        <button
          className={`inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium ${
            file.status === "Pending"
              ? "text-gray-500"
              : file.status === "Uploading"
              ? "text-yellow-500"
              : file.status === "Processing"
              ? "text-blue-500"
              : file.status === "Download"
              ? "border border-lime-500 text-lime-500 hover:bg-lime-100"
              : ""
          }`}
          onClick={() => downloadOneFile({ file, fetchFile })}
          disabled={file.status !== "Download"}
        >
          {file.status}
        </button>

        <button
          onClick={() => deleteFile(file.id)}
          className={
            "inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium hover:bg-red-100 text-red-700 border border-red-700"
          }
        >
          Delete
        </button>
      </li>
    </>
  );
}
