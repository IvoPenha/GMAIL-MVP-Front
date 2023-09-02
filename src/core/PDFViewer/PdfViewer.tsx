import { useRef, useState, Ref } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

type Props = {
  fileItem: Blob
}

function PDFViewer({ fileItem } : Props){
  const canvasRef = useRef<Ref<HTMLCanvasElement> | undefined>()
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pagesQuantity, setPagesQuantity] = useState<number>(0)
  const [scale, setScale] = useState(1)
  const canPreviousPage = currentPage > 1
  const canNextPage = currentPage < pagesQuantity

  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    if (canNextPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const onLoadSuccess = ({ numPages }: any): void => {
    setPagesQuantity(numPages)
  }

  const zoomIn = () => {
    setScale(prev => prev*1.5)
  }
  const zoomOut = () => {
    setScale(prev => prev*0.5)
  }
  

  return (
    <div  className={'pdf-document'}>
      {/* <div>
        <div>
          <button onClick={previousPage} disabled={!canPreviousPage}>
            &laquo; Voltar
          </button>
          <button onClick={nextPage} disabled={!canNextPage}>
            Próximo &raquo;
          </button>
        </div>
        <div>
            <div onClick={zoomIn} style={{color:'black' , background:'#ccc', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent: 'center', textAlign:'center',height:40, width:40, padding:8, cursor: 'pointer'}}/>
            <div onClick = {zoomOut} style={{color:'black' , background:'#ccc', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent: 'center', textAlign:'center',height:40, width:40, padding:8, cursor: 'pointer'}}/>

        </div>
        <span>
          Página {currentPage} de {pagesQuantity}
        </span>
      </div> */}

      <Document
        file={fileItem}
        loading={<div style={{paddingBottom:20}}>Carregando</div>}
        error={'Não foi possível carregar o PDF.'}
        noData={'Nenhum PDF encontrado.'}
        onLoadSuccess={onLoadSuccess}
       
      >
        <Page
          canvasRef={canvasRef as Ref<HTMLCanvasElement>}
          pageNumber={currentPage}
          renderAnnotationLayer={false}
          scale={2}
          className={'pdfcanva'}
        />
      </Document>
    </div>
  )
}

export default PDFViewer
