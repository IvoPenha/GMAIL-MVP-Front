import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import CustomChakraUiButton from '../../../../shared/components/Button/Button';
import { useState } from 'react'
import { downloadBlob } from '../../../../core/core';
import { FaCheck } from 'react-icons/fa';
import PDFViewer from '../../../../core/PDFViewer/PdfViewer';
import './BoletoModal.css'
import { StatusMenu } from '..';
import { Boleto } from '../../../../types';
import { patchBoletoSituacao } from '../../../../services';
import { Situacao } from '../../../../shared';

interface Props {
  currentFile?: Blob | null,
  currentFileName?: string,
  boleto: Boleto,
  changeSituation: (id: number, situacao: Situacao) => void
}

export const BoletoModalContent: React.FC<Props> = ({
  boleto,
  currentFile,
  currentFileName,
  changeSituation
}) => {
  const [isCopying, setIsCopying] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const { codigoBarras, dataVencimento, enviadoPor, valor } = boleto

  return <Box
    className='boleto-modal-content'
    display={"flex"}
    flexDirection={"column"}
    gap={'5rem'}
    paddingTop={10}
  >
    <Box
      borderBottom={"1px solid "}
      borderColor={"neutral"}
    >
      <Box>
        <Flex flexDir={"column"} gap={0.5}>
          <Text color={"neutral"} fontSize={"sm"}>
            Empresa
          </Text>
          <Text fontWeight={500} color={"black"}>
            {enviadoPor}
          </Text>
        </Flex>

        <Flex
          justifyContent={"space-between"}
        >
          <Flex flexDir={"column"} gap={0.5}>
            <Text color={"neutral"} fontSize={"sm"}>
              Vencimento
            </Text>
            <Text fontWeight={500} color={"black"}>
              {dataVencimento && new Date(dataVencimento).toLocaleDateString('pt-Br')}
            </Text>
          </Flex>
          <Flex flexDir={"column"} gap={0.5}>
            <Text color={"neutral"} fontSize={"sm"}>
              Valor
            </Text>
            <Text fontWeight={500} color={"black"}>
              {valor}
            </Text>
          </Flex>
          <Flex flexDir={"column"} gap={0.5} align={'start'} >
            <Text color={"neutral"} fontSize={"sm"}>
              Status
            </Text>
            <Box
              width={'full'}
              display={'flex'}
              justifyContent={'start'}
              w={'6.5rem'}
            >
              <StatusMenu
                value={boleto.situacao}
                onValueChange={async (value) => {
                  boleto.situacao = value;
                  changeSituation(boleto.id, value)
                  patchBoletoSituacao(boleto.id, value);
                }}
              />
            </Box>
          </Flex>
        </Flex>

        <Flex flexDir={"column"} gap={0.5}>
          <Text color={"neutral"} fontSize={"sm"}>
            Linha Digitavel
          </Text>
          <Text fontWeight={500} color={"black"}>
            {codigoBarras}
          </Text>
        </Flex>
        <Flex gap={{ base: '1rem', md: '2rem' }} marginTop={3}
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <CustomChakraUiButton
            isLoading={isDownloading}
            variant={"primary"}
            onClick={async () => {
              setIsDownloading(true)
              if (currentFile && currentFileName)
                await downloadBlob(currentFile, currentFileName)
              setIsDownloading(false)
            }
            }
          >
            DOWNLOAD
          </CustomChakraUiButton>
          <CustomChakraUiButton
            variant={"primary"}
            onClick={() => {
              if (!codigoBarras) return

              navigator.clipboard.writeText(
                codigoBarras
              );
              setIsCopying(true)
              setTimeout(() => {
                setIsCopying(false)
              }, 3000)
            }}
          >
            {isCopying ? <> <Icon as={FaCheck} alignSelf={'center'} marginRight={3} /> COPIADO</> : <>COPIAR CÓDIGO</>}
          </CustomChakraUiButton>
        </Flex>
      </Box>

    </Box>

    {currentFile && <PDFViewer fileItem={currentFile} />}
  </Box>
}