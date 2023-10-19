import { useEffect, useState } from "react";
import { Modal, CardListSkeleton, SkeletonEstatisticaCard, Situacao, MonthInput } from "../../shared/";
import { Box, Flex, SkeletonText, Text } from "@chakra-ui/react";
import { Boleto, CommonUsuarioClaims } from "../../types";
import { getBoletos, readAnexosFromGoogle } from '../../services/';
// import { MonthInput } from '../components/monthInput';
import { BoletoModalContent, BoletoCard, EstatisticaCard, CarouselContainer, StatusMenu } from './components/';
import { useAuth } from '../../hooks';
import { getDateToYYYYMM } from '../../core';
import { useSearchParams } from 'react-router-dom';



function App() {
  const [isCurrentLoading, setIsCurrentLoading] = useState(true);
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [currentAccount, setCurrentAccount] = useState<CommonUsuarioClaims | undefined>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currenntFile, setCurrentFile] = useState<Blob | null>(null);
  const [currentBoleto, setCurrentBoleto] = useState<Boleto | null>(null);
  const [currentFileName, setCurrentFileName] = useState<string>("");

  const [monthFilter, setMonthFilter] = useState(getDateToYYYYMM(new Date()));
  const [situacaoFilter, setSituacaoFilter] = useState<Situacao | null>(null)

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const { getCurrentAccount } = useAuth()

  const filterParams = new URLSearchParams();

  const [searchParams, setSearchParams] = useSearchParams();

  async function updateBoleto(id: number, newValue: Situacao) {
    const newBoletos = [...boletos].map(item => {
      if (+item.id !== +id) {
        return item;
      }
      // Crie um novo objeto com as propriedades do boleto existente
      return {
        ...item,
        Situacao: newValue
      };
    });
    await setBoletos([])
    await setBoletos([...newBoletos]);

  }

  async function initialGetBoletos() {
    const account = await getCurrentAccount<CommonUsuarioClaims>()
    setCurrentAccount(account);
    // const boletos = await getBoletos(account?.id!, searchParams);
    // setBoletos(boletos);
    // setIsCurrentLoading(false);
  }


  const buscarAnexosPorMes = async (month?: string) => {
    if (!month) {
      const anexos = await readAnexosFromGoogle(getDateToYYYYMM(new Date()));
      console.log(anexos.response.length === 0)
      if (anexos.response.length === 0)
        return;
      if (!currentAccount) return;
      const boletos = await getBoletos(currentAccount.id)
      setBoletos(boletos);
      return;
    };
    const anexos = await readAnexosFromGoogle(month);
    console.log(anexos.response.length === 0)
    if (anexos.response.length === 0)
      return;
    if (!currentAccount) return;
    const boletos = await getBoletos(currentAccount?.id!, searchParams)
    setBoletos(boletos);
  }

  useEffect(() => {
    initialGetBoletos();
    buscarAnexosPorMes()
  }, []);

  useEffect(() => {
    if (situacaoFilter) {
      filterParams.append('situacao', situacaoFilter);
    }

    if (monthFilter) {
      setIsCurrentLoading(true);
      console.log(monthFilter)
      filterParams.delete('month');
      filterParams.append('month', monthFilter)
      buscarAnexosPorMes(monthFilter);
    }

    setSearchParams(filterParams);
  }, [situacaoFilter, monthFilter]);

  useEffect(() => {
    async function getBoletosWithParams() {
      setIsCurrentLoading(true);
      if (!currentAccount) return;
      const boletos = await getBoletos(currentAccount.id, searchParams);
      setBoletos(boletos);
      setIsCurrentLoading(false);
    }
    getBoletosWithParams();

  }, [searchParams]);

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
            w={'full'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={2.5}
              h={'full'}

            >
              Boletos
              <StatusMenu
                onValueChange={(value) => setSituacaoFilter(value)}
                isFilter={true}
                value={situacaoFilter}
              />
            </Box>
            <MonthInput
              onChange={
                (value) => { setMonthFilter(value) }
              }
            />
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
                {boletos.map((boleto) => (
                  <BoletoCard
                    key={boleto.id}
                    boleto={boleto}
                    setCurrentFile={setCurrentFile}
                    setCurrentFileName={setCurrentFileName}
                    setCurrentBoleto={setCurrentBoleto}
                    openModal={openModal}
                  />
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
          OnClose={() => {
            setCurrentBoleto(null)
            closeModal()
          }}
        >
          {currentBoleto && <BoletoModalContent
            boleto={currentBoleto}
            currentFile={currenntFile}
            currentFileName={currentFileName}
            changeSituation={updateBoleto}
          />}
        </Modal>
      </Box >
    </Box >
  );
}

export default App;
