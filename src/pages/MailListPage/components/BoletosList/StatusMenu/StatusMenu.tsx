import { Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import { RefObject, useEffect, useRef, useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillMinusCircle } from 'react-icons/ai';

interface StatusMenuProps {
  onValueChange: (value: boolean) => void;
  value: string;
}

export const StatusMenu: React.FC<StatusMenuProps> = ({ }) => {
  const menu = useDisclosure()
  const [value, setValue] = useState('Pago');
  const [ElementValue, setElementValue] = useState<React.ReactNode>(<Text><AiFillCheckCircle /> Pago</Text>);

  const pagoRef = useRef<HTMLButtonElement>(null);
  const pendenteRef = useRef<HTMLButtonElement>(null);
  const vencidoRef = useRef<HTMLButtonElement>(null);
  const canceladoRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [currentRef, setCurrentRef] = useState<React.RefObject<HTMLButtonElement> | null>(value === 'Pago' ? pagoRef : value === 'Pendente' ? pendenteRef : value === 'Vencido' ? vencidoRef : canceladoRef);


  useEffect(() => {
    switch (value) {
      case 'Pago':
        if (menuRef.current) {
          menuRef.current.style.marginTop = '-50px';
        }
        setCurrentRef(pagoRef);
        setElementValue(<Text color={'success'} display={'flex'} gap={2} alignItems={'center'} ><AiFillCheckCircle fontSize={18} /> Pago</Text>);
        break;
      case 'Pendente':
        if (menuRef.current) {
          menuRef.current.style.marginTop = '-90px';
        }
        setCurrentRef(pendenteRef);
        setElementValue(<Text color={'soft'} display={'flex'} gap={2} alignItems={'center'}  ><AiFillMinusCircle fontSize={18} /> Pendente</Text>);
        break;
      case 'Vencido':
        if (menuRef.current) {
          menuRef.current.style.marginTop = '-130px';
        }
        setCurrentRef(vencidoRef);
        setElementValue(<Text color={'danger'} display={'flex'} gap={2} alignItems={'center'} ><AiFillCloseCircle fontSize={18} /> Vencido</Text>);
        break;
      case 'Cancelado':
        if (menuRef.current) {
          menuRef.current.style.marginTop = '-170px';
        }
        setCurrentRef(canceladoRef);
        setElementValue(<Text color={'yellow'} display={'flex'} gap={2} alignItems={'center'}  ><AiFillCloseCircle fontSize={18} /> Cancelado</Text>);
        break;
    }
  }, [value])

  const onChange = (value: string) => {
    setValue(value);
  }
  return (
    <Menu isLazy
      {...menu}
      initialFocusRef={currentRef as RefObject<{ focus(): void; }>}
    >
      <MenuButton
        border={'none'}
        outline={'none'}
        _focus={{
          outline: 'none',
          border: 'none'
        }}
        _hover={{
          border: 'none',
          outline: 'none',
          opacity: .8
        }}
      >{ElementValue}</MenuButton>
      <MenuList
        fontWeight={500}
        ref={menuRef}
      >
        <MenuItem
          display={'flex'}
          gap={'6px'}
          ref={pagoRef}
          color={'success'}
          onClick={() => onChange('Pago')}
        > <AiFillCheckCircle /> Pago</MenuItem>
        <MenuItem
          display={'flex'}
          gap={'6px'}
          color={'soft'}
          onClick={() => onChange('Pendente')}
          ref={pendenteRef}
        >
          <AiFillMinusCircle />
          Pendente</MenuItem>
        <MenuItem
          display={'flex'}
          gap={'6px'}
          color={'danger'}
          onClick={() => onChange('Vencido')}
          ref={vencidoRef}
        >
          <AiFillCloseCircle />
          Vencido</MenuItem>
        <MenuItem
          display={'flex'}
          gap={'6px'}
          color={'yellow'}
          onClick={() => onChange('Cancelado')}
          ref={canceladoRef}
        >
          <AiFillCloseCircle />
          Cancelado</MenuItem>
      </MenuList>
    </Menu>
  )
}