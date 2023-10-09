import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Text,
  Image,
  Icon,
} from "@chakra-ui/react";
import {
  AiOutlineCloseCircle as CloseIcon,
  AiOutlineMenuFold as HamburgerIcon,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const navigateHome = () => navigate("/boletos");
  return (
    <>
      <Box bg={"primary"} px={{ md: "10rem", base: '1rem' }}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          zIndex={3}
        >
          <IconButton
            fontSize={25}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none", base: "flex" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box
              fontSize={25}
              display={"flex"}
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
