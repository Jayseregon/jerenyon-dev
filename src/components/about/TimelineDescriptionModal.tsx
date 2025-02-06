"use client";

import { useTranslations } from "next-intl";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TimelineItem } from "@/interfaces/About";

interface TimelineDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: TimelineItem;
}

export const TimelineDescriptionModal = ({
  isOpen,
  onClose,
  item,
}: TimelineDescriptionModalProps) => {
  const t = useTranslations("timeline");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined} className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-purple-800 dark:text-purple-300 text-xl">
            {item.label}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 mb-6">
          {item.description && item.description.length > 0 ? (
            <ul className="list-disc list-outside space-y-2 text-justify px-5">
              {item.description.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          ) : (
            <p>{t("modal.empty")}</p>
          )}
        </div>
        <DialogFooter>
          <Button variant="form" onClick={onClose}>
            {t("modal.close")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
