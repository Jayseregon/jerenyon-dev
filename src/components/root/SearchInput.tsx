import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "@/components/icons";
import { SearchInputProps } from "@/interfaces/Root";

export default function SearchInput({
  alwaysExpanded = false,
  isInsideNavbar = false,
  nonce,
  onSearch,
}: SearchInputProps) {
  const searchInputRef = useRef<HTMLDivElement>(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const t = useTranslations();

  useEffect(() => {
    if (alwaysExpanded) setIsSearchExpanded(true);
  }, [alwaysExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !alwaysExpanded &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [alwaysExpanded]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <div ref={searchInputRef} className="relative" nonce={nonce}>
      {isSearchExpanded || alwaysExpanded ? (
        <div
          className={cn("relative", isInsideNavbar ? "h-full" : "h-8")}
          nonce={nonce}
        >
          <Input
            className={cn(
              "pl-10 pr-4",
              isInsideNavbar ? "rounded-xl" : "rounded-full",
              "bg-background border-purple-800 dark:border-purple-300",
              "hover:bg-purple-200 dark:hover:bg-purple-700",
              "hover:border-purple-400 dark:hover:border-purple-400",
              "focus:bg-background",
              "focus:border-purple-500 dark:focus:border-purple-500",
              "h-full",
            )}
            nonce={nonce}
            placeholder={t("collapsedMenu.searchBar")}
            type="search"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <SearchIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-primary pointer-events-none"
            nonce={nonce}
          />
        </div>
      ) : (
        <SearchIcon
          className="cursor-pointer text-purple-800 dark:text-purple-300 hover:text-primary transition-colors"
          nonce={nonce}
          onClick={() => setIsSearchExpanded(true)}
        />
      )}
    </div>
  );
}
