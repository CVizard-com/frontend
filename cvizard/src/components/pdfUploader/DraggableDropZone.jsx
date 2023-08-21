import { DragContext } from "../../containers/PdfUploader";
import { FilesContext } from "../../App";
import { useContext } from "react";
import { useDropzone } from "react-dropzone";

export function DraggableDropZone() {
  const { isDragActive, setIsDragActive } = useContext(DragContext);
  const { file, setFiles } = useContext(FilesContext);

  function addFile(event) {
    const acceptedFiles = event.target.files;
    Array.from(acceptedFiles).forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        setFiles((currentFiles) => {
          return [
            ...currentFiles,
            {
              id: crypto.randomUUID(),
              fileName: file.name,
              status: "Pending",
              file: file,
              isActive: false,
              fields: {
                name: [],
                address: [],
                phone: [],
                website: [],
                email: [],
                other: [],
              },
            },
          ];
        });
      };
      reader.readAsDataURL(file);
    });
  }

  const onDrop = (e) => {
    setIsDragActive(false);
    e.forEach((file) => {
      addFile({ target: { files: [file] } });
    });
  };

  const onDragEnter = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = (e) => {
    setIsDragActive(false);
  };

  const onDragEnd = (e) => {
    setIsDragActive(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    onDragEnter: onDragEnter,
    onDragLeave: onDragLeave,
    onDragEnd: onDragEnd,
    // onDragOver: onDragOver,
    accept: { "application/pdf": [".pdf"], docx: [".docx"] },
    type: file,
  });
  let style = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 200,
    backgroundColor: isDragActive ? "rgba(0, 0, 0, 0.3)" : "transparent",
  };

  return (
    <div
      {...getRootProps()}
      style={style}
      className={`${
        isDragActive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive && (
        <div className="flex items-center justify-center w-full h-full mx-auto text-[3.5rem] font-bold leading-[4rem] tracking-tight text-white">
          <h1>Drop files anywhere</h1>
        </div>
      )}
    </div>
  );
}
