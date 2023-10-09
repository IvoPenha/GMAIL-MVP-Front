import { useEffect, useState } from "react";
import "./MailList.css";
import { BaseConverterStack, downloadBlob, pdfToBlob } from "../../core/core";
import PDFViewer from "../../core/PDFViewer/PdfViewer";
import Modal from "../../shared/components/modal/modal";
import Loading from "../../shared/components/Loading/Loading";
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { Boleto } from "../../types";
// import { MonthInput } from '../components/monthInput';
import { AiFillCloseCircle } from "react-icons/ai";
import CustomChakraUiButton from "../../shared/components/Button/Button";
import { getBoletos } from '../../services/boletos/boletos';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const [currenntFile, setCurrentFile] = useState<Blob | null>(null);
  const [currentBoleto, setCurrentBoleto] = useState<Boleto | null>(null);
  const [currentFileName, setCurrentFileName] = useState<string>("");
  const [isCurrentLoading, setIsCurrentLoading] = useState(true);

  const [boletos, setBoletos] = useState<Boleto[]>([]);

  // const { getCurrentAccount } = useAuth()

  useEffect(() => {
    // const currentAccount = getCurrentAccount<CommonUsuarioClaims>();
    async function initialGetBoletos() {
      const boletos = await getBoletos(1);
      setBoletos(boletos);
      setIsCurrentLoading(false);
    }

    initialGetBoletos();
  }, []);

  //put token up here

  return (
    <Box
      bgColor={'white'}
      overflowY={"hidden"}
    >
      {/* <MonthInput/> */}
      <div className="wrapper">
        {isCurrentLoading ? (
          <Loading></Loading>
        ) : (
          <>
            <Text
              fontSize={"1.25rem"}
              fontWeight={"bold"}
              color={"black"}
              marginBottom={"1rem"}
            >
              Boletos
            </Text>
            {boletos.map((boleto, index) => (
              <Box
                key={index}
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

                {/* <h4>assunto = {boleto.assunto} </h4> */}
                {/* <hr />

                <h4>codigoBarra = {boleto.codigoBarras}</h4>
                <h4>vencimento = {boleto.dataVencimento} </h4>
                <h4>linha Digitavel = {boleto.linhaDigitavel} </h4> */}
              </Box>
            ))}
            {/* //   boletos.map((boleto, index) =>
          //       <div
          //         key={index}
          //         className="card"
          //         onClick={() => {
          //           const myDecodedAttachment = mydecodedMails[index]?.attachment;
          //           if (myDecodedAttachment !== undefined) {
          //             setCurrentFile(pdfToBlob(myDecodedAttachment));
          //             setCurrentFileName(mail.fileName);
          //             openModal();
          //           }
          //         }}
          //       >
          //         <strong>{mail.SentBy}</strong>
          //         <p>
          //           {mail.fileName}
          //         </p>
          //         <div style={{ background: '#ddd', color: '#111', borderRadius: '8px', padding: '6px', width: 'full', maxWidth: '100%' }}>
          //           Linha digitável: {mail.boleto.linhaDigitavel}
          //         </div>
          //         <div style={{ background: '#ddd', color: '#111', borderRadius: '8px', marginTop: '10px', padding: '6px', width: 'full', maxWidth: '100%' }}>
          //           Valor do Boleto R$: {mail.boleto.valor}
          //         </div>

          //         <div style={{ background: '#ddd', color: '#111', borderRadius: '8px', marginTop: '10px', padding: '6px', width: 'full', maxWidth: '100%' }}>
          //           Vencimento do boleto: {new Date(mail.boleto.vencimento).toLocaleDateString('pt-br')}
          //         </div>

          //         {
          //           mail.boleto.sucesso === false && (
          //             <div style={{ background: '#ddd', color: '#111', borderRadius: '8px', marginTop: '10px', padding: '6px', width: 'full', maxWidth: '100%' }}>
          //               <p> <strong>Erro ao ler boleto: </strong> {mail.boleto.mensagem}</p>
          //             </div>
          //           )
          //         }


          //       </div>
          //     )
          //   )
          // } */}
          </>
        )}
      </div>
      <Box
      >
        <Modal
          isOpen={isModalOpen}
          OnClose={closeModal}
        // Title={"Visualizando " + currentFileName}
        >
          {currenntFile && (
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={'5rem'}
            >
              <Box
                borderBottom={"1px solid "}
                borderColor={"neutral"}
                paddingBottom={"5rem"}
              >
                {currentBoleto && (
                  <Box>
                    <Flex flexDir={"column"} gap={0.5}>
                      <Text color={"neutral"} fontSize={"sm"}>
                        Empresa
                      </Text>
                      <Text fontWeight={500} color={"black"}>
                        {currentBoleto.enviadoPor}
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
                          {new Date(currentBoleto.dataVencimento).toLocaleDateString('pt-Br')}
                        </Text>
                      </Flex>
                      <Flex flexDir={"column"} gap={0.5}>
                        <Text color={"neutral"} fontSize={"sm"}>
                          Valor
                        </Text>
                        <Text fontWeight={500} color={"black"}>
                          {currentBoleto.valor}
                        </Text>
                      </Flex>
                      <Flex flexDir={"column"} gap={0.5}>
                        <Text color={"neutral"} fontSize={"sm"}>
                          Status
                        </Text>
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
                    </Flex>

                    <Flex flexDir={"column"} gap={0.5}>
                      <Text color={"neutral"} fontSize={"sm"}>
                        Linha Digitavel
                      </Text>
                      <Text fontWeight={500} color={"black"}>
                        {currentBoleto.codigoBarras}
                      </Text>
                    </Flex>
                    <Flex gap={{ base: '1rem', md: '2rem' }}
                      flexDirection={{ base: 'column', md: 'row' }}
                    >
                      <CustomChakraUiButton
                        variant={"primary"}
                        onClick={() =>
                          downloadBlob(currenntFile, currentFileName)
                        }
                      >
                        DOWNLOAD
                      </CustomChakraUiButton>
                      <CustomChakraUiButton
                        variant={"primary"}
                        onClick={() => {
                          navigator.clipboard.writeText(
                            currentBoleto.codigoBarras
                          );
                        }}
                      >
                        COPIAR CÓDIGO
                      </CustomChakraUiButton>
                    </Flex>
                  </Box>
                )}
              </Box>

              <PDFViewer fileItem={currenntFile} />
            </Box>
          )}
        </Modal>
      </Box >
    </Box >
  );
}

export default App;
