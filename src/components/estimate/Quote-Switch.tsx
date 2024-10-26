"use client";

import { Sun, Moon, Check } from "lucide-react";
import React, { useState } from "react";

import CustomToggleSwitch from "@/components/ui/CustomToggleSwitch";

export function DemoQuoteSwitch() {
  const [isOn, setIsOn] = useState(false);

  return (
    <CustomToggleSwitch
      height={24}
      isOn={isOn}
      nonce="your-nonce-value"
      offColor="purple"
      offIcon={<Moon />}
      width={48}
      onColor="amber"
      onIcon={<Sun />}
      onToggle={() => setIsOn(!isOn)}
    />
  );
}

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
  nonce?: string;
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
  nonce,
}: QuoteSwitchProps) {
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
