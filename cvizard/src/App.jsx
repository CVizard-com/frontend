import { useState, useEffect, useRef } from 'react'
import './App.css'
import axios from "axios";
import FileSaver from "file-saver";
// import List from './List';

export default function App() {
  const [files, setFiles] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })
  const fileInputRef = useRef([null]);

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(files))
  }, [files])

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    console.log(event.target.files);
    Array.from(event.target.files).forEach((file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      // const fileContent = e.target.result;

      setFiles(currentFiles => {
        return [
          ...currentFiles, 
          {id: file.name, 
          "name": file.name,
          "status": "pending",
          file: file},
          ]
      })
    };
    reader.readAsDataURL(file);
    });

    
  };

  function deleteFile(id) {
    setFiles(currentFiles => {
      return currentFiles.filter(file => file.id !== id)
    })
  }

  const handleFilesUpload = () => {
    console.log(files)
    setFiles(currentFiles => {
      return currentFiles.map(file => {
        if (file.status === "pending") {
          return {...file, status: "done"}
        }
        return file
      })
    })
    // setFiles(currentFiles => {
    //     return [
    //       ...currentFiles, 
    //       {id: file.id, 
    //       "name": file.name,
    //       "status": "done",
    //       file: file.fileContent},
    //     ]
    //   })
    // const formData = new FormData();
    // files.forEach((file) => {
    // formData.append("pdf_file", file)});
    // console.log(formData);
    // axios
    //   .post("http://cvizard.com:8080/api/reader", formData)
    //   .then((response) => {
    //     console.log(response);
    //     setResponseData(response.data.file_id);
    //     localStorage.setItem("file_id", response.data.file_id);
    //     setFeedback("Uploaded!");
    //   })
    //   .catch((error) => {
    //     console.error("There was an error!", error);
    //     setFeedback("Error!");
    //   });
  };

  const handleFilesDownload = () => {
    files.forEach((file) => {
      if (file.status === "done") {
        const blob = new Blob([file.file], { type: "application/pdf" });
        FileSaver.saveAs(blob, file.name);
      }
    })
  }

  return (
    <>
      <section className="flex items-center justify-center min-h-screen w-full bg-white">
      <div className="mx-auto max-w-[43rem]">
        <div className="text-center">
          <p className="text-lg font-medium leading-8 text-cyan-500">Introducing CVizard</p>
          <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black">Anonymize and convert every CV</h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-400 py-6">Specify helps you unify your brand identity by collecting, storing and distributing design tokens and assets — automatically.</p>
        </div>
        {/* <List files={files}></List> */}
        <div className="flex items-center justify-center">
          {files.length > 0 ? 
          <ul role="list" className="divide-y divide-slate-100 w-6/12 max-h-64 overflow-auto rounded-md border-2 border-slate-300">
            {files.map((file) => {
                return (
                  <>
                    <li key={file.id} className="grid grid-cols-4 gap-4 py-3 w-full px-4">
                        <p className="col-span-2 text-sm font-semibold leading-6 text-gray-900 overflow-hidden">{file.name}</p>
                        <p className=" text-sm font-semibold leading-6 text-yellow-500">{file.status}</p>
                        {file.status === "pending" ? 
                          <button onClick={() => deleteFile(file.id)} className=" inline-flex items-center justify-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Delete</button>
                          :null
                        }
                    </li>
                    </>
                )
            }
            )}
            {files.filter(file => file.status !== "done").length === files.length && files.length > 0 ? 
              <li className=" sticky bottom-0 bg-white"><button type="file" onClick={handleButtonClick} accept="application/pdf" className="rounded-md bg-cyan-500 px-5 py-3 font-medium text-white transition-colors hover:bg-cyan-600 my-2">Add files</button>
                      <input
                        type="file"
                        accept="application/pdf"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                      </li> : null
            }
            
        </ul>
      
          
        : 
        <>
        <button type="file" onClick={handleButtonClick} accept="application/pdf" className="transform rounded-md bg-cyan-500 px-5 py-3 font-medium text-white transition-colors hover:bg-cyan-600 m-4">Add files</button>
                      <input
                        multiple
                        type="file"
                        accept="application/pdf"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                </>}
        
        </div>
        <div className="flex items-center justify-center">
          {files.filter(file => file.status !== "done").length === files.length && files.length > 0 ?
          <button onClick={handleFilesUpload} className="transform rounded-md bg-cyan-500 px-5 py-3 font-medium text-white transition-colors hover:bg-cyan-600 m-4">Upload files</button>
          : null}
          {files.filter(file => file.status === "done").length === files.length && files.length > 0 ? 
            <button onClick={handleFilesDownload} className="transform rounded-md bg-cyan-500 px-5 py-3 font-medium text-white transition-colors hover:bg-cyan-600 m-4">Download files</button>
            : null
          }
        </div>
      </div>
    </section>
    </>
  )
}