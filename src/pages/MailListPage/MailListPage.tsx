import { useEffect, useState } from "react";
import "./MailList.css";
import { getReadMails } from "../../services/service";
import { BaseConverterStack, downloadBlob, pdfToBlob } from "../../core/core";
import { PiFilePdfDuotone, PiDownloadSimpleLight } from "react-icons/pi";
import PDFViewer from "../../core/PDFViewer/PdfViewer";
import Modal from "../../shared/components/modal/modal";
import Loading from "../../shared/components/Loading/Loading";
import { Button } from '@chakra-ui/react';
import { useAuth } from '../../hooks';
import { CommonUsuarioClaims } from '../../types/CommonUsuario';
import { Cache } from '../../core';
type Mail = {
  SentBy: string;
  fileName: string;
  emailDate: string;
  messageId: string;
  subject?: string;
  attachment: {
    sucesso: boolean;
    codigoInput: string;
    mensagem: string;
    tipoCodigoInput: string;
    tipoBoleto: string;
    codigoBarras: string;
    linhaDigitavel: string;
    vencimento: string;
    valor: number;
    base64: string;
  };
};

function App() {
  const [mails, setMails] = useState([]);
  const [mydecodedMails, setDecodedMails] = useState<
    ({
      SentBy: string;
      fileName: string;
      emailDate: string;
      messageId: string;
      subject?: string;
      attachment: Uint8Array;
    } | null)[]
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const [currenntFile, setCurrentFile] = useState<Blob | null>(null);
  const [currentFileName, setCurrentFileName] = useState<string>("");
  const [isCurrentLoading, setIsCurrentLoading] = useState(true);

  const { getCurrentAccount } = useAuth()

  useEffect(() => {
    const currentAccount = getCurrentAccount<CommonUsuarioClaims>();
    console.log(currentAccount)
    const token = Cache.get({key:'token'})
    console.log(token)
    async function getMails() {
      const mails = await getReadMails('me', token);
      setMails(mails);
    }
    getMails();
  }, []);
  //put token up here
  useEffect(() => {
    const decodedMails = mails.map((mail: Mail | null) => {
      return mail == null || !mail.fileName.endsWith(".pdf")
        ? null
        : { ...mail, attachment: BaseConverterStack(mail.attachment.base64) };
    });
    setDecodedMails(decodedMails);
    mails.length > 0 && setIsCurrentLoading(false);
  }, [mails]);

  return (
    <>
      <div className="wrapper">
        {isCurrentLoading ? (
          <Loading></Loading>
        ) : (
          mails.map((mail: Mail | null, index) =>
            mail == null || !mail.fileName.endsWith(".pdf") ? (
              <div key={index}></div>
            ) : (
              //@ts-ignore
              <div
                key={index}
                className="card"
                onClick={() => {
                  const myDecodedAttachment = mydecodedMails[index]?.attachment;
                  if (myDecodedAttachment !== undefined) {
                    setCurrentFile(pdfToBlob(myDecodedAttachment));
                    setCurrentFileName(mail.fileName);
                    openModal();
                  }
                }}
              >
                <strong>{mail.SentBy}</strong>
                <p>
                  {mail.fileName} <PiFilePdfDuotone /> <PiDownloadSimpleLight />
                </p>
                <div style={{ background: '#ddd', color:'#111', borderRadius:'8px', padding: '6px', width:'full', maxWidth: '100%'  } }>
                    Numero do Boleto: {mail.attachment.codigoInput}
                </div>
                <div style={{ background: '#ddd', color:'#111', borderRadius:'8px', marginTop: '10px', padding: '6px', width:'full', maxWidth: '100%'  } }>
                    Valor do Boleto R$: {mail.attachment.valor}
                </div>
                
                <div style={{ background: '#ddd', color:'#111', borderRadius:'8px', marginTop: '10px', padding: '6px', width:'full', maxWidth: '100%'  } }>
                    Vencimento do boleto: {new Date(mail.attachment.vencimento).toLocaleDateString('pt-br')}
                </div>
              </div>
            )
          )
        )}
      </div>
      <div>
        <Modal
          isOpen={isModalOpen}
          OnClose={closeModal}
          Title={"Visualizando " + currentFileName}
        >
          {currenntFile && <>
          <p>Clique aqui para baixar <Button onClick={() => downloadBlob(currenntFile, currentFileName)} /> </p>
          <PDFViewer fileItem={currenntFile} />
          </>
          }
        </Modal>
      </div>
    </>
  );
}

export default App;
