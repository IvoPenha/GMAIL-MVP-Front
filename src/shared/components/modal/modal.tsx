import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';


interface Props {
  isOpen: boolean;
  OnClose: () => void
  children: React.ReactNode
  Title?: string
}

const CustomModal = ({
  isOpen,
  OnClose,
  children,
  Title = ''
}: Props) => {
  return (
    <Modal onClose={OnClose} size={'6xl'} isOpen={isOpen}>
      <ModalOverlay overflowY={'hidden'}
        sx={
          {
            '::-webkit-scrollbar': {
              width: '.2rem',
            },
            '::-webkit-scrollbar-track': {
              bg: ''
            },
            '::-webkit-scrollbar-thumb': {
              bg: 'primary',
              borderRadius: 'full'
            },
          }
        }
      />
      <ModalContent overflowY={'scroll'} scrollBehavior={'smooth'} maxHeight={{ md: '85%', base: 'full' }}
        sx={
          {
            '::-webkit-scrollbar': {
              width: '.2rem',
            },
            '::-webkit-scrollbar-track': {
              bg: ''
            },
            '::-webkit-scrollbar-thumb': {
              bg: 'primary',
              borderRadius: 'full'
            },
          }
        }

      >
        {<ModalHeader>{Title}</ModalHeader>}
        <ModalCloseButton zIndex={3000} />
        <ModalBody
          paddingX={{ base: '1rem', md: '10%' }}
        >
          {children}
        </ModalBody>
        <ModalFooter>
          <Button onClick={OnClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal >
  )
}

export default CustomModal