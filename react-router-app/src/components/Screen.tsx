import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthModal } from "@/components/AuthModal";
import { Button } from "@/components/ui/button";

interface ScreenProps {
  children: React.ReactNode;
}

export const Screen: React.FC<ScreenProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-background border-b border-border text-foreground p-4 h-[61px] flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold">
            {t("components.screen.topBar.title")}
          </span>
          <Link to="/" className="hover:text-primary">{t("nav.tasks")}</Link>
          <Link to="/workers" className="hover:text-primary">{t("nav.workers")}</Link>
        </div>
        <div className="flex items-center space-x-2">
          <AuthModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
            <Button variant="outline" size="icon" onClick={() => setIsAuthModalOpen(true)}>
              <KeyRound size={20} />
            </Button>
          </AuthModal>

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
        </div>
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
