import { useEffect, useState } from "react";
import { Modal, CardListSkeleton, SkeletonEstatisticaCard } from "../../shared/";
import { Box, Flex, SkeletonText, Text } from "@chakra-ui/react";
import { Boleto, CommonUsuarioClaims } from "../../types";
import { getBoletos } from '../../services/';
// import { MonthInput } from '../components/monthInput';
import { BoletoModalContent, BoletoCard, EstatisticaCard, CarouselContainer } from './components/';
import { useAuth } from '../../hooks';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const [currenntFile, setCurrentFile] = useState<Blob | null>(null);
  const [currentBoleto, setCurrentBoleto] = useState<Boleto | null>(null);
  const [currentFileName, setCurrentFileName] = useState<string>("");
  const [isCurrentLoading, setIsCurrentLoading] = useState(true);
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [currentAccount, setCurrentAccount] = useState<CommonUsuarioClaims | undefined>();

  const { getCurrentAccount } = useAuth()

  useEffect(() => {
    setCurrentAccount(getCurrentAccount<CommonUsuarioClaims>());
    async function initialGetBoletos() {
      const boletos = await getBoletos(currentAccount?.id!);
      setBoletos(boletos);
      setIsCurrentLoading(false);
    }

    initialGetBoletos();
  }, []);

  const estatisticas = [
    { title: 'A pagar', value: 5 },
    { title: 'Vencidos', value: 2 },
    { title: 'Pagos', value: 10 },
    { title: 'Cancelados', value: 1 }
  ];


  return (
    <Box
      bgColor={'white'}
      overflowY={"hidden"}

      paddingTop={5}
    >
      {/* <MonthInput/> */}
      <Box

        display={"flex"}
        flexDirection={"column"}
        gap={6}
      >
        <Box
          display={{ md: 'flex', base: 'none' }}
        >
          <Text
            color={'primary'}
            fontSize={'xl'}
            fontWeight={400}
            lineHeight={'1.2rem'}
          >
            <Flex
              alignItems={'center'}
              gap={1}
            >
              Olá  <strong>{currentAccount ? currentAccount?.nome : <SkeletonText noOfLines={1} width={'5rem'} marginRight={-1} />}</strong>, bem vindo de volta!
            </Flex>
            <Text
              color={'softText'}
              fontSize={'sm'}
            >
              Gerencie seus pagamentos com facilidade e segurança.
            </Text>
          </Text>
        </Box>
        <Box>
          <Text
            fontSize={"1.25rem"}
            fontWeight={"bold"}
            color={"black"}
            marginBottom={"1rem"}
          >
            Estatisticas
          </Text>
          <CarouselContainer
          >
            {
              isCurrentLoading ? (
                estatisticas.map((estatistica, index) => (
                  <Box
                    key={index}
                  >
                    <SkeletonEstatisticaCard
                      title={estatistica.title}
                    />
                  </Box>
                ))
              ) : (
                estatisticas.map((estatistica, index) => (
                  <Box
                    key={index}
                  >
                    <EstatisticaCard
                      title={estatistica.title}
                      value={estatistica.value}
                      margin={index === 0 ? undefined : 'left'}
                    />
                  </Box>
                ))
              )
            }


          </CarouselContainer>
        </Box>
        <Box>
          <Text
            fontSize={"1.25rem"}
            fontWeight={"bold"}
            color={"black"}
            marginBottom={"1rem"}
          >
            Boletos
          </Text>
          {isCurrentLoading ? (
            <CardListSkeleton />
          ) : (
            <Box
              paddingY={2}
              paddingX={.5}
            >

              <Box
                display={"grid"}
                rowGap={8}
                gridTemplateColumns={{ xl: "repeat(3, 1fr)", lg: "repeat(2,1fr)", base: "repeat(1, 1fr)" }}
                columnGap={6}
                width={'full'}
              >
                {boletos.map((boleto, index) => (
                  <Box
                    key={index}
                  >
                    <BoletoCard
                      boleto={boleto}
                      setCurrentFile={setCurrentFile}
                      setCurrentFileName={setCurrentFileName}
                      setCurrentBoleto={setCurrentBoleto}
                      openModal={openModal}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}

        </Box>

      </Box>
      <Box
      >
        <Modal
          isOpen={isModalOpen}
          OnClose={closeModal}
        >
          <BoletoModalContent
            codigoBarras={currentBoleto?.codigoBarras}
            dataVencimento={currentBoleto?.dataVencimento}
            enviadoPor={currentBoleto?.enviadoPor}
            valor={currentBoleto?.valor}
            currentFile={currenntFile}
            currentFileName={currentFileName}
          />
        </Modal>
      </Box >
    </Box >
  );
}

export default App;
