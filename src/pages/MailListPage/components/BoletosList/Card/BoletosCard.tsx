import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { BaseConverterStack, pdfToBlob } from '../../../../../core/core';
import { Boleto } from '../../../../../types';
import { StatusMenu } from '../..';
import { patchBoletoSituacao } from '../../../../../services';

interface Props {
  boleto: Boleto,
  setCurrentFile: (file: Blob | null) => void,
  setCurrentFileName: (fileName: string) => void,
  setCurrentBoleto: React.Dispatch<React.SetStateAction<Boleto | null>>,
  openModal: (boolean?: boolean) => void
}

export const BoletoCard: React.FC<Props> = ({
  boleto,
  setCurrentFile,
  setCurrentFileName,
  setCurrentBoleto,
  openModal,
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
      cursor={"pointer"}
      zIndex={0}
      width={'full'}
      bg="white"
      boxShadow={"lg"}
      dropShadow={'2xl'}
      rounded="lg"
      display={"flex"}
      height={"fit-content"}
      alignItems={"center"}
      paddingX={".75rem"}
      paddingY={".8rem"}
      gap={".875rem"}
    >
      <Avatar
        size="md"
        name={boleto.enviadoPor}
      />
      <Flex justifyContent={"space-between"} w={"100%"}

      >
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
          onClick={e => e.stopPropagation()}
          display={'flex'}
          alignItems={'center'}
        >
          <StatusMenu
            value={boleto.Situacao}
            onValueChange={async (value) => {
              const updatedBoleto = { ...boleto, Situacao: value };
              setCurrentBoleto(updatedBoleto);
              await patchBoletoSituacao(boleto.id, value);
            }}
          />
        </Box>
      </Flex >
    </Box >
  )
}