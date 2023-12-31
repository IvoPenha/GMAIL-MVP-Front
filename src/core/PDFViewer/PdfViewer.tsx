import { Box } from '@chakra-ui/react';
import { useRef, Ref, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
// import { FiZoomIn, FiZoomOut } from 'react-icons/fi';

type Props = {
  fileItem: Blob
}

function PDFViewer({ fileItem }: Props) {
  const canvasRef = useRef<Ref<HTMLCanvasElement> | undefined>()
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  // const [currentPage, setCurrentPage] = useState<number>(1)
  const [pagesQuantity, setPagesQuantity] = useState<number>(0)
  // const [scale, setScale] = useState(1)
  // const canPreviousPage = currentPage > 1
  // const canNextPage = currentPage < pagesQuantity

  // const previousPage = () => {
  //   if (canPreviousPage) {
  //     setCurrentPage(currentPage - 1)
  //   }
  // }

  // const nextPage = () => {
  //   if (canNextPage) {
  //     setCurrentPage(currentPage + 1)
  //   }
  // }

  const onLoadSuccess = ({ numPages }: any): void => {
    setPagesQuantity(numPages)
  }

  // const zoomIn = () => {
  //   setScale(prev => prev * 1.5)
  // }
  // const zoomOut = () => {
  //   setScale(prev => prev * 0.5)
  // }

  console.log(pagesQuantity);


  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      borderRadius={'10px'}
      width={'100%'}
      height={'auto'}
    >
      <Document
        file={fileItem}
        loading={<div style={{ paddingBottom: 20 }}>Carregando</div>}
        error={'Não foi possível carregar o PDF.'}
        noData={'Nenhum PDF encontrado.'}
        onLoadSuccess={onLoadSuccess}

      >
        <Page
          canvasRef={canvasRef as Ref<HTMLCanvasElement>}
          renderTextLayer={false}
          // pageNumber={currentPage}
          pageNumber={1}
          scale={1}
          className={'pdfcanva'}
        />
      </Document>
      {/* <Box display={'flex'} alignItems={'center'} flexDirection={'column'}> */}
      {/* <Box display={'flex'} gap={'6px'}>
          <FiZoomIn onClick={zoomIn} style={{ color: 'black', background: '#ccc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: 40, width: 40, padding: 8, cursor: 'pointer' }} />
          <FiZoomOut onClick={zoomOut} style={{ color: 'black', background: '#ccc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: 40, width: 40, padding: 8, cursor: 'pointer' }} />

        </Box> */}
      {/* <span>
          Página {currentPage} de {pagesQuantity}
        </span>
      </Box> */}
    </Box>
  )
}

export default PDFViewer
