import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { supportContent } from "@/constants/content";
import { BiSolidMessageDetail } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import avatar from "@/assets/support/help.png";
import { GrClose } from "react-icons/gr";

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
  size?: string;
}

export default function SupportPopUp({ isOpen, onClose }: PopUpProps) {
  const openExternalLink = (link: string) => {
    window.open(link, "_blank");
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="6xl">
      <ModalOverlay />
      <ModalContent
        pt="24px"
        px="0"
        bgColor="washi"
        minH="80vh"
        h="80vh"
        overflowY="scroll"
      >
        <div className="flex w-full justify-end px-6">
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
        <div className="flex min-h-screen flex-col items-center">
          <div className="font-title w-full pb-10 pt-[84px] text-center text-smallTitle uppercase">
            {supportContent.title}
          </div>
          <div className="flex h-full w-full flex-col items-center border-y border-off/30 py-[72px]">
            <a className="w-[80%] pb-10 text-left text-lg font-medium uppercase leading-normal tracking-[1.8px]">
              {supportContent.contact.title}
            </a>
            <div className="flex h-full w-[80%] gap-20">
              <div className="flex w-1/2 gap-[25px]">
                <Image
                  src={avatar.src}
                  alt="avatar"
                  className="h-[192px] w-[164px]"
                />
                <div className="flex flex-col justify-center">
                  <a className="font-title text-[32px] uppercase leading-normal">
                    {supportContent.contact.name}
                  </a>
                  <a className="max-w-[210px] pt-2 text-xs font-medium uppercase leading-[150%] tracking-[1.2px]">
                    {supportContent.contact.subTitle}
                  </a>
                </div>
              </div>
              <div className="flex w-1/2 flex-col justify-center gap-8 ">
                <button
                  className="flex w-full items-center justify-start gap-4 rounded-full border border-off/50 px-8 py-4 text-base font-medium uppercase leading-none tracking-[.1rem]"
                  onClick={() =>
                    openExternalLink(supportContent.contact.tgLink)
                  }
                >
                  <BiSolidMessageDetail />
                  {supportContent.contact.tg}
                </button>
                <a
                  href={`mailto:${supportContent.contact.mailLink}`}
                  className="flex w-full items-center justify-start gap-4 rounded-full border border-off/50 px-8 py-4 text-base font-medium uppercase leading-none tracking-[.1rem]"
                >
                  <IoMdMail />
                  {supportContent.contact.email}
                </a>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center border-l border-off/30 pt-[72px]">
            <div className="flex w-[77%] flex-col items-start justify-center">
              <a className="pb-9 text-lg font-medium uppercase leading-normal tracking-[1.8px]">
                {supportContent.web3FAQ.title}
              </a>
              <div className="flex w-full flex-col gap-6 text-off">
                {supportContent.web3FAQ.list.map((item, index) => (
                  <Accordion allowMultiple key={index}>
                    <AccordionItem
                      border="none"
                      borderBottom="1px"
                      borderColor="rgba(59,59,59,0.3)"
                    >
                      <AccordionButton
                        px="0"
                        pt="0"
                        pb="6"
                        display="flex"
                        justifyContent="space-between"
                      >
                        <a className="text-lg font-medium leading-[150%]">
                          {item.q}
                        </a>
                        <AccordionIcon boxSize="30px" />
                      </AccordionButton>
                      <AccordionPanel pb={8} pt="0" pl="0">
                        <a className="text-base leading-[150%]">{item.a}</a>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
              <a className="mt-[72px] pb-9 text-lg font-medium uppercase leading-normal tracking-[1.8px]">
                {supportContent.yohakuFAQ.title}
              </a>
              <div className="flex w-full flex-col gap-6 text-off">
                {supportContent.yohakuFAQ.list.map((item, index) => (
                  <Accordion allowMultiple key={index}>
                    <AccordionItem
                      border="none"
                      borderBottom="1px"
                      borderColor="rgba(59,59,59,0.3)"
                    >
                      <AccordionButton
                        px="0"
                        pt="0"
                        pb="6"
                        display="flex"
                        justifyContent="space-between"
                      >
                        <a className="text-lg font-medium leading-[150%]">
                          {item.q}
                        </a>
                        <AccordionIcon boxSize="30px" />
                      </AccordionButton>
                      <AccordionPanel pb={8} pt="0" pl="0">
                        <a className="text-base leading-[150%]">{item.a}</a>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
