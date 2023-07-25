export function PdfFile({ id, name, status, file, deleteFile }) {
  return (
    <>
      <li className="grid grid-cols-4 gap-4 py-3 w-full px-4">
        <p className="col-span-2 text-sm font-semibold leading-6 text-gray-900 overflow-hidden">
          {name}
        </p>
        <p className=" text-sm font-semibold leading-6 text-yellow-500">
          {status}
        </p>

        <button
          onClick={() => deleteFile(id)}
          disabled={status !== "pending"}
          className={`inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
            status !== "pending"
              ? "bg-gray-400 text-gray-200 ring-gray-600/10"
              : "bg-slate-400 text-red-700 ring-red-600/10"
          }`}
        >
          Delete
        </button>
      </li>
    </>
  );
}
