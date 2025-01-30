export interface ThemeSwitchProps {
  className?: string;
  nonce: string;
}

export interface SearchInputProps {
  alwaysExpanded?: boolean;
  isInsideNavbar?: boolean;
  nonce: string;
  onSearch?: (value: string) => void;
}
export interface LocaleSwitcherProps {
  nonce: string;
}

export interface CustomToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  onColor: string; // Tailwind color name (e.g., 'amber')
  offColor: string; // Tailwind color name (e.g., 'purple')
  onIcon?: React.ReactNode; // Icon, string, or null
  offIcon?: React.ReactNode; // Icon, string, or null
  width?: number; // Width in pixels
  height?: number; // Height in pixels
  className?: string;
  nonce?: string;
}

export interface CustomRadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export interface CustomRadioProps {
  value: string;
  label: string;
  className?: string;
}

export interface CustomSliderProps {
  id: string;
  minValue: number;
  maxValue: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export interface HamburgerMenuButtonProps {
  toggleMenu: (event: React.PointerEvent<HTMLButtonElement>) => void;
  menuButtonVariants: {
    open: { rotate: number };
    closed: { rotate: number };
  };
  isMenuOpen: boolean;
  topBarVariants: {
    open: { d: string };
    closed: { d: string };
  };
  styling?: string;
  nonce: string;
}

export interface CollapsedMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  nonce: string;
}
