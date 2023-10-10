import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { BaseConverterStack, pdfToBlob } from '../../../../core/core';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Boleto } from '../../../../types';

interface Props {
  boleto: Boleto,
  setCurrentFile: (file: Blob | null) => void,
  setCurrentFileName: (fileName: string) => void,
  setCurrentBoleto: (boleto: Boleto | null) => void,
  openModal: (boolean?: boolean) => void
}

export const BoletoCard: React.FC<Props> = ({
  boleto,
  setCurrentFile,
  setCurrentFileName,
  setCurrentBoleto,
  openModal
}) => {
  return (
    <Box
      onClick={() => {
        const anexoEm8Bits = BaseConverterStack(boleto.base64);
        if (anexoEm8Bits) {
          setCurrentFile(pdfToBlob(anexoEm8Bits));
          setCurrentFileName(boleto.nomeArquivo);
          setCurrentBoleto(boleto);
          openModal();
        }
      }}
      width={{ md: '21rem', base: 'full' }}
      bg="white"
      boxShadow={"2xl"}
      dropShadow={'2xl'}
      rounded="lg"
      display={"flex"}
      height={"fit-content"}
      alignItems={"center"}
      paddingX={".75rem"}
      gap={".875rem"}
    >
      <Avatar
        size="md"
        name={boleto.enviadoPor}
      />
      <Flex justifyContent={"space-between"} w={"100%"}>
        <Box
          maxWidth={"12rem"}
          display={"flex"}
          flexDirection={"column"}
          gap={"0.1rem"}
        >
          <Text
            fontWeight="bold"
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            fontSize={"sm"}
          >
            {boleto.enviadoPor}{" "}
          </Text>
          <Text textColor={"gray.500"}>
            {" "}
            {new Date(boleto.dataEmail).toLocaleDateString(
              "pt-Br"
            )}{" "}
          </Text>
          <Text fontWeight={"bold"}> R$ {boleto.valor} </Text>
        </Box>

        <Box
          display={"flex"}
          alignItems={"center"}
          paddingX={".5rem"}
          fontSize={"sm"}
          gap={2}
          color={"danger"}
        >
          <AiFillCloseCircle fontSize={"1.2rem"} />
          Vencido
        </Box>
      </Flex>
    </Box>
  )
}