import { FormList } from "./FormList";
import { ProcessButton } from "./ProcessButton";
import { FilesContext } from "../../App";
import { useContext } from "react";

export function Form({ file }) {
  const { files, setFiles } = useContext(FilesContext);
  const getCurrentIndex = () => {
    return files.findIndex((e) => e === file);
  };
  const phrases = [
    "Keep going!🔥",
    "You're doing great!💪🏾",
    "Almost there!😀",
    "Stay strong, keep on!🏋🏻",
    "You've got this—persist!🔥",
    "Success is your journey's end!🌅",
  ];

  return (
    <div className="grid grid-cols-2 w-8/12 h-5/6">
      <FormList fieldName="name" file={file} />
      <FormList fieldName="address" file={file} />
      <FormList fieldName="phone" file={file} />
      <FormList fieldName="email" file={file} />
      <FormList fieldName="website" file={file} />
      <FormList fieldName="other" file={file} />
      <div className="flex items-center justify-center w-full px-20 text-slate-400">
        <b>
          {getCurrentIndex()}/{files.length}
        </b>
        &nbsp; files are done. {phrases[getCurrentIndex() % phrases.length]}
      </div>
      <ProcessButton activeFile={file} />
    </div>
  );
}
