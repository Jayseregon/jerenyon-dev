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
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      scrollBehavior="inside"
      size="5xl"
      onOpenChange={onClose}
    >
      <ModalContent>
        <ModalHeader>{item.label}</ModalHeader>
        <ModalBody>
          {item.description && item.description.length > 0 ? (
            <ul className="list-disc list-inside space-y-2">
              {item.description.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          ) : (
            <p>No additional details available yet.</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
