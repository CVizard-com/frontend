import { TemplateSelectorBaner } from "../components/templateSelector/TemplateSelectorBaner";
import { Selector } from "../components/templateSelector/Selector";
import { DownloadButton } from "../components/templateSelector/DownloadButton";
import { useState, createContext } from "react";

export const TemplateContext = createContext();
export const FormatContext = createContext();

export function TemplateSelector() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      isActive: true,
      label: "EN",
    },
    {
      id: 2,
      isActive: false,
      label: "PL",
    },
  ]);

  const [formats, setFormats] = useState([
    {
      id: 1,
      isActive: true,
      label: "pdf",
    },
    {
      id: 2,
      isActive: false,
      label: "docx",
    },
  ]);

  return (
    <div className="flex flex-col justify-center min-h-screen w-full mx-auto">
      <TemplateContext.Provider value={{ templates, setTemplates }}>
        <FormatContext.Provider value={{ formats, setFormats }}>
          <TemplateSelectorBaner />
          <Selector />
          <DownloadButton />
        </FormatContext.Provider>
      </TemplateContext.Provider>
    </div>
  );
}
