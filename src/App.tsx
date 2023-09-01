import { useEffect, useState } from 'react'
import './App.css'
import { getReadMails } from './services/service'
import {  BaseConverterStack, downloadPDF, } from './core/core'
import { PiFilePdfDuotone, PiDownloadSimpleLight } from '../node_modules/react-icons/pi'
interface Mail {
  EmailSentler: string
  fileName: string
  attachment: string
}

function App() {

  const [mails, setMails] = useState([])
  const [mydecodedMails, setDecodedMails] = useState<({
    attachment: Uint8Array;
    EmailSentler: string;
    fileName: string;
} | null)[]>([])

  useEffect(() => {
    async function getMails() {
      const mails = await getReadMails()
      setMails(mails)
    }
    getMails()
    
  }, [])
  useEffect(() => {
    console.log('oiii')
    const decodedMails = mails.map((mail: Mail | null) => {
      return mail == null ? null : { ...mail, attachment: BaseConverterStack(mail.attachment) }
    })
    setDecodedMails(decodedMails)
  }, [mails])

  return (
    <>
    <div className="wrapper">
    {mails.map((mail: Mail | null, index) => (
      mail == null || !mail.fileName.endsWith('.pdf') ? <div></div> :
      //@ts-ignore
      <div key={index} className="card" onClick={() => mydecodedMails[index] && downloadPDF(mydecodedMails[index]?.attachment, mail.fileName)}>
        <p>{mail.EmailSentler}</p>
        <p>{mail.fileName} <PiFilePdfDuotone /> <PiDownloadSimpleLight/></p>  
        {/* <p>{decodeBase64(mail.attachment)}</p> */}
      </div>
    ))}
    </div>
    </>
  )
}

export default App
