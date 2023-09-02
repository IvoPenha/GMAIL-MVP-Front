import ReactModal from 'react-modal'
import { AiOutlineCloseCircle  } from 'react-icons/ai'

interface Props {
  isOpen: boolean;
  OnClose: () => void
  children: React.ReactNode
}

export const Modal = ({
  isOpen,
  OnClose,
  children
} : Props) => {
  return (
    <ReactModal isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.5)'
        },
        content: {
          position: 'absolute',
          top: '40px',
          left: '40px',
          right: '40px',
          bottom: '40px',          
          background: '#ececec',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px',
        }
      }}
      
      onRequestClose={() => OnClose()}
    >
      <button onClick={OnClose} style={
        {
          position: 'absolute',
          top: 20,
          right: 20,
          color: 'red',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '40px',
          fontWeight: 'bold',
          padding: 0,

        }
      } > <AiOutlineCloseCircle />  </button>
      {children}
    </ReactModal>
  )
}
