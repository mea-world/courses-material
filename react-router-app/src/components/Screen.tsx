import React from "react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

interface ScreenProps {
  children: React.ReactNode;
}

export const Screen: React.FC<ScreenProps> = ({ children }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-background border-b border-border text-foreground p-4 h-[61px] flex justify-between items-center">
        <span className="text-xl font-bold">
          {t("components.screen.topBar.title")}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer outline-none">
            <div className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
              <Globe size={20} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => changeLanguage("en")}>
              {t("components.screen.topBar.languageSwitcher.en")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage("it")}>
              {t("components.screen.topBar.languageSwitcher.it")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <main className="p-4 mt-[61px] mb-[40px]">{children}</main>
      <footer className="fixed bottom-0 left-0 right-0 bg-background text-foreground text-center p-2 h-[40px]">
        <span className="text-sm">
          {t("components.screen.footer.copyright", {
            date: new Date().getFullYear(),
          })}
        </span>
      </footer>
    </>
  );
};
