"use client";

import { Check } from "lucide-react";
import React, { useContext } from "react";

import { NonceContext } from "@/src/app/providers";
import CustomToggleSwitch from "@/components/ui/CustomToggleSwitch";

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
    <div aria-label={ariaLabel} className="flex items-center">
      <CustomToggleSwitch
        className={className}
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
      {label && <span className="ml-2">{label}</span>}
    </div>
  );
}
