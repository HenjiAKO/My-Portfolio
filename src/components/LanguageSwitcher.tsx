import { useTranslation } from "../i18n/context";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { lang, setLang } = useTranslation();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLang(lang === "en" ? "fr" : "en")}
      className="border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
    >
      <Languages className="w-4 h-4 mr-1" />
      <span className="text-xs font-medium">{lang === "en" ? "FR" : "EN"}</span>
    </Button>
  );
}
