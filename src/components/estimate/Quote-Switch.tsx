"use client";

import { Check } from "lucide-react";
import React, { useContext } from "react";

import { NonceContext } from "@/src/app/providers";
import CustomToggleSwitch from "@/src/components/root/CustomToggleSwitch";
import { cn } from "@/src/lib/utils";

interface QuoteSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  label?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  onColor?: string;
  offColor?: string;
  onIcon?: React.ReactNode;
  offIcon?: React.ReactNode;
  width?: number;
  height?: number;
}

export function QuoteSwitch({
  isOn,
  onToggle,
  label,
  ariaLabel,
  className,
  onColor = "green",
  offColor = "purple",
  onIcon = <Check />,
  offIcon = null,
  width = 35,
  height = 20,
}: QuoteSwitchProps) {
  const nonce = useContext(NonceContext);

  return (
    <div aria-label={ariaLabel} className="flex items-start space-x-2 py-1.5">
      <CustomToggleSwitch
        className={cn("shrink-0", className)}
        height={height}
        isOn={isOn}
        nonce={nonce}
        offColor={offColor}
        offIcon={offIcon}
        width={width}
        onColor={onColor}
        onIcon={onIcon}
        onToggle={onToggle}
      />
      {label && <span className="leading-tight">{label}</span>}
    </div>
  );
}
