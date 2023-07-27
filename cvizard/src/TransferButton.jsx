export function TransferButton({ transferFiles, label }) {
  return (
    <button
      onClick={transferFiles}
      className="transform rounded-md bg-cyan-500 px-5 py-3 font-medium text-white transition-colors hover:bg-cyan-600"
    >
      {label}
    </button>
  );
}
