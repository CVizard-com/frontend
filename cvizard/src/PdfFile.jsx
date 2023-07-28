import axios from "axios";

async function donwloadOneFile({ file }) {
  try {
    const response = await axios.get(
      `https://cvizard.com:8443/api/maker/download?key=${file.id}`,
      { responseType: "arraybuffer" }
    );
    const pdfData = await response.data;
    const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
    saveAs(pdfBlob, file.name);

  } catch (error) {
    console.error("Error while downloading file", error);
  }
}

export function PdfFile({ file, deleteFile }) {
  return (
    <>
      <li className="grid grid-cols-4 gap-4 py-3 w-full px-4 h-12">
        <p className="col-span-2 text-sm font-semibold leading-6 text-gray-900 overflow-hidden ">
          {file.name}
        </p>
        <button
          className={` font-medium text-xs leading-6 rounded-md ring-1 ${
            file.status === "pending"
              ? "text-gray-500"
              : file.status === "uploading"
              ? "text-yellow-500"
              : file.status === "processing"
              ? "text-blue-500"
              : "text-lime-500 "
          }`}
          onClick={() => donwloadOneFile({ file })}
          disabled={file.status !== "done"}
        >
          {file.status}
        </button>

        <button
          onClick={() => deleteFile(file.id)}
          className={"inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset bg-red-100 text-red-700 ring-red-600/10"}
        >
          Delete
        </button>
      </li>
    </>
  );
}
