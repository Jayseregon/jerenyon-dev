import React from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

interface CustomToggleSwitchProps {
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

const allowedColors = [
  "amber",
  "purple",
  "blue",
  "green",
  "red",
  "yellow",
  "indigo",
  "pink",
  "gray",
  "teal",
];

export default function CustomToggleSwitch({
  isOn,
  onToggle,
  onColor,
  offColor,
  onIcon,
  offIcon,
  width = 64,
  height = 32,
  className,
  nonce,
}: CustomToggleSwitchProps) {
  const { theme } = useTheme();

  // Validate colors
  const validOnColor = allowedColors.includes(onColor) ? onColor : "green";
  const validOffColor = allowedColors.includes(offColor) ? offColor : "gray";

  // Compute class names
  const handleBgColor = isOn
    ? theme === "light"
      ? `bg-${validOnColor}-300 border-${validOnColor}-400`
      : `bg-${validOnColor}-600 border-${validOnColor}-700`
    : `bg-${validOffColor}-600 border-${validOffColor}-700`;
  const iconColor = isOn
    ? `text-${validOnColor}-600`
    : `text-${validOffColor}-600`;

  // Sizes
  const switchWidth = width;
  const switchHeight = height;
  const handleSize = height - 8; // Adjust handle size to fit within the switch

  return (
    <div
      aria-checked={isOn}
      className={cn(
        "relative flex items-center p-1 rounded-full border border-purple-800 dark:border-purple-300 cursor-pointer",
        className,
      )}
      nonce={nonce}
      role="switch"
      style={{ width: switchWidth, height: switchHeight }}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onToggle();
        }
      }}
    >
      <motion.div whileTap={{ scale: 0.95 }}>
        {/* ON section */}
        {onIcon && (
          <motion.div>
            <div
              className={cn(
                "absolute left-1 flex items-center justify-center",
                {
                  hidden: !isOn,
                  [iconColor]: isOn,
                },
              )}
              nonce={nonce}
              style={{ width: handleSize, height: handleSize }}
            >
              {onIcon}
            </div>
          </motion.div>
        )}

        {/* OFF section */}

        {offIcon && (
          <motion.div>
            <div
              className={cn(
                "absolute right-1 flex items-center justify-center",
                {
                  hidden: isOn,
                  [iconColor]: !isOn,
                },
              )}
              nonce={nonce}
              style={{ width: handleSize, height: handleSize }}
            >
              {offIcon}
            </div>
          </motion.div>
        )}

        {/* TOGGLE section */}
        <motion.div
          layout
          animate={{ x: isOn ? switchWidth - handleSize - 8 : 0 }}
          initial={false}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div
            className={cn(
              "rounded-full border-2 shadow-xl flex items-center justify-center",
              handleBgColor,
            )}
            nonce={nonce}
            style={{ width: handleSize, height: handleSize }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
