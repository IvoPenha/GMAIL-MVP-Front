import { useEffect, useState } from "react";
import { Modal, CircularLoading } from "../../shared/";
import { Box, Text } from "@chakra-ui/react";
import { Boleto, CommonUsuarioClaims } from "../../types";
import { getBoletos } from '../../services/';
// import { MonthInput } from '../components/monthInput';
import { BoletoModalContent, BoletoCard } from './components/';
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

  const { getCurrentAccount } = useAuth()

  useEffect(() => {
    const currentAccount = getCurrentAccount<CommonUsuarioClaims>();
    async function initialGetBoletos() {
      if (!currentAccount) return

      const boletos = await getBoletos(currentAccount?.id!);
      setBoletos(boletos);
      setIsCurrentLoading(false);
    }

    initialGetBoletos();
  }, []);
  return (
    <Box
      bgColor={'white'}
      overflowY={"hidden"}
    >
      {/* <MonthInput/> */}
      <div className="wrapper">
        {isCurrentLoading ? (
          <CircularLoading />
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
          </>
        )}
      </div>
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
