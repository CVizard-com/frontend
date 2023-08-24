import DocViewer from "react-doc-viewer";

export function PdfPreviewComponent({ file }) {
  const isPdf = file && file.file.type === "application/pdf";
  return (
    <>
      <div className="w-4/12 pb-8 px-8 h-5/6">
        <h3 className="w-full px-8 mx-auto text-left font-medium text-cyan-500">
          Preview
        </h3>

        {isPdf ? (
          <iframe
            className="rounded-lg border-2 border-slate-300"
            src={URL.createObjectURL(file.file)}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        ) : (
          <div className="flex items-center justify-center rounded-lg border-2 border-slate-300 h-[600px] w-full">
            Preview is not available for .docx files, sorry
          </div>
        )}
      </div>
    </>
  );
}
