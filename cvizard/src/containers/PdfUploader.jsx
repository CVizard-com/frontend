import { Baner } from "../components/Baner";
import { ListForm } from "../components/ListForm";

export function PdfUploader() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-white">
      <div className="mx-auto max-w-[43rem]">
        <Baner />
        <ListForm />
      </div>
    </div>
  );
}
