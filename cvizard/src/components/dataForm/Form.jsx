import { FormList } from "./FormList";
import { ProcessButton } from "./ProcessButton";
export function Form({ file }) {
  return (
    <div className="grid grid-cols-2 w-8/12 h-5/6">
      <FormList name="Name" />
      <FormList name="Address" />
      <FormList name="Phone" />
      <FormList name="Email" />
      <FormList name="Website" />
      <FormList name="Other" />
      <div></div>
      <ProcessButton activeFile={file} />
    </div>
  );
}
