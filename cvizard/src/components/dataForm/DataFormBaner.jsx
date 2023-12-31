import React, { useContext, useEffect } from "react";
import { FilesContext } from "../../App";

export function DataFormBaner() {
  return (
    <div className="text-center">
      <h1 className="w-full text-center my-8 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black">
        Ensure private data is not shared
      </h1>
      <p className="text-lg text-xl leading-8 text-cyan-500 mb-8">
        Please review and ensure the accuracy of any auto-detected personal data
      </p>
    </div>
  );
}
