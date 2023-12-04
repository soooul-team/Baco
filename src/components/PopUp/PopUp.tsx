import React from "react";
import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { GrClose } from "react-icons/gr";

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
  size?: string;
}

export default function PopUp({
  isOpen,
  onClose,
  title,
  subTitle,
  children,
  size = "4xl",
}: PopUpProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
      <ModalOverlay />
      <ModalContent
        p="24px"
        bgColor="washi"
        minH="80vh"
        h="80vh"
        overflowY="auto"
      >
        <div className="flex w-full justify-end">
          <div
            onClick={onClose}
            className="flex cursor-pointer items-center gap-2"
          >
            <a className="text-xs font-medium leading-[120%] tracking-[1.2px]">
              CLOSE
            </a>
            <GrClose size="20px" />
          </div>
        </div>
        {subTitle && title && (
          <div className="ModalHeader flex flex-col gap-4 border-b border-off/50 pb-10 pt-6 uppercase text-off">
            <a className="text-modalSub font-medium tracking-[1.2px]">
              {subTitle}
            </a>
            <a className="font-title text-5xl font-normal leading-normal">
              {title}
            </a>
          </div>
        )}
        <div className="ModalBody h-full">{children}</div>
      </ModalContent>
    </Modal>
  );
}
