import { useEffect, useState } from "react";
import "./App.css";
import { getReadMails } from "./services/service";
import { BaseConverterStack, pdfToBlob } from "./core/core";
import {
  PiFilePdfDuotone,
  PiDownloadSimpleLight,
} from "../node_modules/react-icons/pi";
import PDFViewer from "./core/PDFViewer/PdfViewer";
import { Modal } from "./shared/components/modal/modal";
interface Mail {
  EmailSentler: string;
  fileName: string;
  attachment: string;
}

function App() {
  const [mails, setMails] = useState([]);
  const [mydecodedMails, setDecodedMails] = useState<
    ({
      attachment: Uint8Array;
      EmailSentler: string;
      fileName: string;
    } | null)[]
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  useEffect(() => {
    async function getMails() {
      const mails = await getReadMails();
      setMails(mails);
    }
    getMails();
  }, []);
  useEffect(() => {
    const decodedMails = mails.map((mail: Mail | null) => {
      return mail == null
        ? null
        : { ...mail, attachment: BaseConverterStack(mail.attachment) };
    });
    setDecodedMails(decodedMails);
  }, [mails]);

  
  const [currenntFile, setCurrentFile] = useState<Blob | null>(null);
  return (
    <>
      <div className="wrapper">
        {mails.map((mail: Mail | null, index) =>
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
                  openModal();
                }
              }}
            >
              <p>{mail.EmailSentler}</p>
              <p>
                {mail.fileName} <PiFilePdfDuotone /> <PiDownloadSimpleLight />
              </p>
              {/* <p>{decodeBase64(mail.attachment)}</p> */}
            </div>
          )
        )}
      </div>
      <div>
        <Modal isOpen={isModalOpen} OnClose={closeModal}>
          {currenntFile && <PDFViewer fileItem={currenntFile} />}
        </Modal>
      </div>
    </>
  );
}

export default App;
