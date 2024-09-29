import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

import { SearchIcon } from "@/components/icons";

/**
 * SearchInput component that displays a search input field.
 * The input field can be expanded or collapsed based on user interaction.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.alwaysExpanded=false] - Boolean indicating if the input should always be expanded.
 * @param {boolean} [props.isInsideNavbar=false] - Boolean indicating if the input is inside the navbar.
 */
export default function SearchInput({
  alwaysExpanded = false,
  isInsideNavbar = false,
  nonce,
}: {
  alwaysExpanded?: boolean;
  isInsideNavbar?: boolean;
  nonce: string;
}) {
  // Search state
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const t = useTranslations();

  // Expand search input if alwaysExpanded is true (inside toggle menu)
  useEffect(() => {
    if (alwaysExpanded) {
      setIsSearchExpanded(true);
    }
  }, [alwaysExpanded]);

  /**
   * Toggles the search input expansion state.
   */
  const toggleSearch = () => {
    if (!alwaysExpanded) {
      setIsSearchExpanded(!isSearchExpanded);
    }
  };

  // Close search input when not focused
  useEffect(() => {
    /**
     * Handles click events outside the search input to collapse it.
     *
     * @param {Object} event - The click event.
     * @param {any} event.target - The target element of the click event.
     */
    const handleClickOutside = (event: { target: any }) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchInputRef}
      nonce={nonce}
      className="relative">
      {isSearchExpanded || alwaysExpanded ? (
        <div
          className={`relative ${isInsideNavbar ? "h-full" : "h-8"}`}
          nonce={nonce}>
          <input
            aria-label="Search"
            className={`bg-background ${isInsideNavbar ? "rounded-xl" : "rounded-full"} border border-purple-800 dark:border-purple-300 hover:bg-purple-200 dark:hover:bg-purple-700 hover:border-purple-400 dark:hover:border-purple-400 focus:bg-purple-100 dark:focus:bg-purple-900 focus:border-purple-500 dark:focus:border-purple-500 text-sm text-foreground placeholder-foreground w-full pl-10 pr-4 py-2 h-full`}
            placeholder={t("collapsedMenu.searchBar")}
            type="search"
            nonce={nonce}
          />
          <SearchIcon
            nonce={nonce}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-primary pointer-events-none"
          />
        </div>
      ) : (
        <SearchIcon
          className="cursor-pointer text-purple-800 dark:text-purple-300 hover:text-primary transition-colors"
          onClick={toggleSearch}
          nonce={nonce}
        />
      )}
    </div>
  );
}
