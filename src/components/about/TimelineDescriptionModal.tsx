"use client";

import { useTranslations } from "next-intl";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

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
    <Modal
      hideCloseButton
      backdrop="blur"
      className="bg-background text-foreground border border-purple-800 dark:border-purple-300"
      isOpen={isOpen}
      scrollBehavior="inside"
      size="5xl"
      onOpenChange={onClose}
    >
      <ModalContent>
        <ModalHeader className="text-purple-800 dark:text-purple-300 text-xl">
          {item.label}
        </ModalHeader>
        <ModalBody>
          {item.description && item.description.length > 0 ? (
            <ul className="list-disc list-outside space-y-2 text-justify px-5">
              {item.description.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          ) : (
            <p>{t("modal.empty")}</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-fit bg-background text-foreground py-2 px-4 border border-purple-800 dark:border-purple-300 hover:bg-purple-800 hover:text-background hover:dark:text-purple-300 focus:outline-none"
            onPress={onClose}
          >
            {t("modal.close")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
