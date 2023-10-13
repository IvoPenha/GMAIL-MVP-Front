import {
  Box,
  Flex,
  HStack,
  // IconButton,
  // useDisclosure,
  Stack,
  Text,
  Image,
  Icon,
} from "@chakra-ui/react";
// import {
//   AiOutlineCloseCircle as CloseIcon,
//   AiOutlineMenuFold as HamburgerIcon,
// } from "react-icons/ai";
import { useNavigate, useMatch } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { FiArrowLeft } from 'react-icons/fi';
import { getCurrentAccount } from '../../core';
import { CommonUsuarioClaims } from '../../types';

export function Header() {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const navigateHome = () => navigate("/");
  const isSettingsPage = useMatch("/settings");
  const currentAccount = getCurrentAccount<CommonUsuarioClaims>();

  return (
    <>
      <Box bg={"primary"} px={{ md: "10rem", base: '1rem' }}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          zIndex={3}
        >
          {/* <IconButton
            fontSize={25}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none", base: "flex" }}
            onClick={isOpen ? onClose : onOpen}
          /> */}
          <HStack spacing={8} alignItems={"center"}>
            <Box
              fontSize={25}
              display={{ md: "flex", base: 'none' }}
              alignItems={"center"}
              gap={2}
              _hover={{ cursor: "pointer" }}
              onClick={navigateHome}
            >
              <Image src="/logoframe8.png" h={"2rem"} />
              <Text
                fontWeight={400}
                fontSize={"lg"}
                letterSpacing={".05rem"}
                fontFamily={"logo"}
                color={"white"}
              >
                docpost
              </Text>
            </Box>

            <Box
              fontSize={18}
              display={{ md: "none", base: 'flex' }}
              color={'surface'}
              height={'full'}
              gap={2}
              alignItems={"center"}
            // onClick={navigateHome}
            >
              {
                isSettingsPage ? <> <Text fontSize={22} cursor={'pointer'} _hover={{
                  opacity: .9
                }} onClick={navigateHome}><FiArrowLeft /></Text> Preferências</> : `Olá ${currentAccount?.nome}!`
              }

            </Box>
          </HStack>
          <Flex>
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <Icon
                as={IoMdSettings}
                color={"white"}
                fontSize={25}
                _hover={{ cursor: "pointer" }}
                onClick={() => navigate("/settings")}
              />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
