import { TemplateSelectorBaner } from "../components/templateSelector/TemplateSelectorBaner";
import { Selector } from "../components/templateSelector/Selector";
import { DownloadButton } from "../components/templateSelector/DownloadButton";
import { useState, createContext } from "react";

export const TemplateContext = createContext();

export function TemplateSelector() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      isActive: false,
      label: "PL",
    },
    {
      id: 2,
      isActive: false,
      label: "EN",
    },
  ]);

  return (
    <div className="flex flex-col justify-center min-h-screen w-full mx-auto">
      <TemplateContext.Provider value={{ templates, setTemplates }}>
        <TemplateSelectorBaner />
        <Selector />
        <DownloadButton />
      </TemplateContext.Provider>
    </div>
  );
}
