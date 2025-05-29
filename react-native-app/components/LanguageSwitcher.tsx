import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "./ui/text";
import Animated, { FadeIn } from "react-native-reanimated";
import { Globe } from "@/lib/icons/Globe";
import { useTranslation } from "react-i18next";

const LANGUAGES = ["it", "en"];

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Globe className="text-foreground" size={24} strokeWidth={1.25} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20">
        <DropdownMenuLabel>
          {LANGUAGES.map((language) => (
            <DropdownMenuItem
              key={language}
              onPress={() => i18n.changeLanguage(language)}
            >
              <Text>{t(`components.languageSwitcher.${language}`)}</Text>
            </DropdownMenuItem>
          ))}
        </DropdownMenuLabel>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Text>Team</Text>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Text>Invite users</Text>
            </DropdownMenuSubTrigger>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Text>New Team</Text>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Text>GitHub</Text>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Text>Support</Text>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Text>API</Text>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Text>Log out</Text>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
