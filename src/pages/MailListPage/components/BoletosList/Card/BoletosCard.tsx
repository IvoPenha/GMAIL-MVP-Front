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
      width={'full'}
      bg="white"
      boxShadow={"0px 2px 5px -3px rgba(0, 0, 0)"}
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
            {new Date(boleto.dataVencimento).toLocaleDateString(
              "pt-Br"
            )}{" "}
          </Text>
          <Text fontWeight={"bold"}> R$ {boleto.valor} </Text>
        </Box>
        <Box
          onClick={e => e.stopPropagation()}
          display={'flex'}
          alignItems={'center'}
          w={'30%'}
          justifyContent={'end'}
        >
          <StatusMenu
            value={boleto.situacao}
            onValueChange={async (value) => {
              const updatedBoleto = { ...boleto, situacao: value };
              setCurrentBoleto(updatedBoleto);
              boleto.situacao = value;
              await patchBoletoSituacao(boleto.id, value);
            }}
          />
        </Box>
      </Flex >
    </Box >
  )
}