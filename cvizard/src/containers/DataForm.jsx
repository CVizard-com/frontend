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
          <div className="relative min-h-screen w-full ">
            <div
              className={`flex flex-wrap justify-center min-h-screen w-full bg-white z-10 absolute top-0 ${
                fetchingData ? "blur-sm" : ""
              }`}
            >
              {/* <FetchingContext.Provider value={{ fetchingData, setFetchingData }}> */}
              <DataFormBaner />
              <Form file={activeFile} />
              <PdfPreviewComponent file={activeFile} />
              {/* </FetchingContext.Provider> */}
            </div>
            {fetchingData && (
              <div className="absolute top-0 flex items-center justify-center min-h-full w-full z-50">
                <img
                  src="src/images/loading.gif"
                  alt="loading"
                  className="w-20"
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
