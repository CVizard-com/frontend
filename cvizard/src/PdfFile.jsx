export function PdfFile({ id, name, status, file, deleteFile }) {
  return (
    <>
      <li className="grid grid-cols-4 gap-4 py-3 w-full px-4 h-12">
        <p className="col-span-2 text-sm font-semibold leading-6 text-gray-900 overflow-hidden">
          {name}
        </p>
        <p
          className={` text-sm font-semibold leading-6 ${
            status === "pending"
              ? "text-gray-500"
              : status === "uploading"
              ? "text-yellow-500"
              : status === "processing"
              ? "text-blue-500"
              : "text-lime-500"
          }`}
        >
          {status}
        </p>

        <button
          onClick={() => deleteFile(id)}
          //   disabled={status !== "pending"}
          disabled={status === "done" ? true : false}
          className={`inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
            status === "done"
              ? "bg-gray-400 text-gray-200 ring-gray-600/10"
              : "bg-red-100 text-red-700 ring-red-600/10"
          }`}
        >
          Delete
        </button>
      </li>
    </>
  );
}
