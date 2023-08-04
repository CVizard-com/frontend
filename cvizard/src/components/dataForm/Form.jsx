import { FormList } from "./FormList";
export function Form({ file }) {
  return (
    <div className="grid grid-cols-2 gap-4 w-8/12 px-16">
      <FormList name="Name" />
      <FormList name="Address" />
      <FormList name="Phone" />
      <FormList name="Email" />
      <FormList name="Website" />
      <FormList name="Other" />
    </div>
  );
}
