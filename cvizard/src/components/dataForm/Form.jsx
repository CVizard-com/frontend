import { FormList } from "./FormList";
import { ProcessButton } from "./ProcessButton";
export function Form({ file }) {
  return (
    <div className="grid grid-cols-2 w-8/12 h-5/6">
      <FormList fieldName="name" file={file} />
      <FormList fieldName="address" file={file} />
      <FormList fieldName="phone" file={file} />
      <FormList fieldName="email" file={file} />
      <FormList fieldName="website" file={file} />
      <FormList fieldName="other" file={file} />
      <div></div>
      <ProcessButton activeFile={file} />
    </div>
  );
}
