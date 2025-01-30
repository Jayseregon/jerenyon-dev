import React from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { CustomToggleSwitchProps } from "@/src/interfaces/Root";

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
    <motion.div
      className={cn(
        "relative flex items-center p-1 rounded-full border border-purple-800 dark:border-purple-300 cursor-pointer",
        className,
      )}
      nonce={nonce}
      style={{ width: switchWidth, height: switchHeight }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
    >
      {/* ON section */}
      {onIcon && (
        <motion.div
          className={cn("absolute left-1 flex items-center justify-center", {
            hidden: !isOn,
            [iconColor]: isOn,
          })}
          nonce={nonce}
          style={{ width: handleSize, height: handleSize }}
        >
          {onIcon}
        </motion.div>
      )}

      {/* OFF section */}

      {offIcon && (
        <motion.div
          className={cn("absolute right-1 flex items-center justify-center", {
            hidden: isOn,
            [iconColor]: !isOn,
          })}
          nonce={nonce}
          style={{ width: handleSize, height: handleSize }}
        >
          {offIcon}
        </motion.div>
      )}

      {/* TOGGLE section */}
      <motion.div
        layout
        animate={{ x: isOn ? switchWidth - handleSize - 8 : 0 }}
        className={cn(
          "rounded-full border-2 shadow-xl flex items-center justify-center",
          handleBgColor,
        )}
        initial={false}
        nonce={nonce}
        style={{ width: handleSize, height: handleSize }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    </motion.div>
  );
}
