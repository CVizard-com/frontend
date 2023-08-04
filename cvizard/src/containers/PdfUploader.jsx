import { PdfUploaderBaner } from "../components/pdfUploader/PdfUploaderBaner";
import { ListForm } from "../components/pdfUploader/ListForm";

export function PdfUploader() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-white">
      <div className="mx-auto max-w-[43rem]">
        <PdfUploaderBaner />
        <ListForm />
      </div>
    </div>
  );
}
