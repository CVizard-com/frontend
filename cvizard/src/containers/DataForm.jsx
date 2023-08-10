import { DataFormBaner } from "../components/dataForm/DataFormBaner";
import { FormList } from "../components/dataForm/FormList";
import { PdfPreviewComponent } from "../components/dataForm/PdfPreviewComponent";
import { createContext, useContext, useEffect, useState } from "react";
import { Form } from "../components/dataForm/Form";
import { FetchingContext, FilesContext } from "../App";

// export const FetchingContext = createContext();

export function DataForm() {
  // const [fetchingData, setFetchingData] = useState(false);
  const { files, setFiles } = useContext(FilesContext);
  const activeFile = files.find((file) => file.isActive);
  const { fetchingData, setFetchingData } = useContext(FetchingContext);
  return (
    <>
      {activeFile && (
        <>
          <div className="flex flex-wrap justify-center relative min-h-screen w-full bg-white z-10">
            {/* <FetchingContext.Provider value={{ fetchingData, setFetchingData }}> */}
            <DataFormBaner />
            <Form file={activeFile} />
            <PdfPreviewComponent file={activeFile} />
            {/* </FetchingContext.Provider> */}
            {fetchingData && (
              <div className="absolute inset-0 flex items-center justify-center min-h-screen w-full bg-slate-500 z-50 opacity-50 backdrop-blur-lg">
                <img
                  src="../images/loading.gif"
                  alt="loading"
                  className="items-center justify-center w-20 mx-auto"
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
