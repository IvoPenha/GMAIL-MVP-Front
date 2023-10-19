import { Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import { RefObject, useEffect, useRef, useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillMinusCircle } from 'react-icons/ai';
import { Situacao } from '../../../../../shared';

interface StatusMenuProps {
  onValueChange: (value: any) => void;
  value: Situacao | null;
  isFilter?: boolean;
}

export const StatusMenu: React.FC<StatusMenuProps> = ({ onValueChange, value, isFilter }) => {
  const menu = useDisclosure()
  const [internalValue, setInternalValue] = useState<Situacao | null>(value);
  const [ElementValue, setElementValue] = useState<React.ReactNode>(isFilter ? 'Pagos' : <Text><AiFillCheckCircle /> Pago</Text>);

  const todosRef = useRef<HTMLButtonElement>(null);
  const pagoRef = useRef<HTMLButtonElement>(null);
  const pendenteRef = useRef<HTMLButtonElement>(null);
  const vencidoRef = useRef<HTMLButtonElement>(null);
  const canceladoRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [currentRef, setCurrentRef] = useState<React.RefObject<HTMLButtonElement> | null>(() => {
    switch (internalValue) {
      case Situacao.Pago:
        return pagoRef;
      case Situacao.Pendente:
        return pendenteRef;
      case Situacao.Vencido:
        return vencidoRef;
      case Situacao.Cancelado:
        return canceladoRef;
      default:
        return todosRef;
    }
  });


  useEffect(() => {
    let filterCorretion = 30;
    if (!isFilter) filterCorretion = 0;
    switch (internalValue) {
      case Situacao.Pago:
        if (menuRef.current) {
          if (!isFilter)
            menuRef.current.style.left = '-3rem';
          menuRef.current.style.marginTop = `-${60 + filterCorretion}px `;
        }
        pagoRef.current?.focus()
        setCurrentRef(pagoRef);
        if (isFilter) return setElementValue('Pagos');
        setElementValue(<Text color={'success'} display={'flex'} gap={2} alignItems={'center'} ><AiFillCheckCircle fontSize={18} /> Pago</Text>);
        break;
      case Situacao.Pendente:
        if (menuRef.current) {
          if (!isFilter)
            menuRef.current.style.left = '-1.4rem';
          menuRef.current.style.marginTop = `-${100 + filterCorretion}px`;
        }
        pendenteRef.current?.focus()
        setCurrentRef(pendenteRef);
        if (isFilter) return setElementValue('Pendentes');
        setElementValue(<Text color={'soft'} display={'flex'} gap={2} alignItems={'center'}  ><AiFillMinusCircle fontSize={18} /> Pendente</Text>);
        break;
      case Situacao.Vencido:
        if (menuRef.current) {
          if (!isFilter)
            menuRef.current.style.left = '-1.4rem';
          menuRef.current.style.marginTop = `-${140 + filterCorretion}px`;
        }
        vencidoRef.current?.focus()
        setCurrentRef(vencidoRef);
        if (isFilter) return setElementValue('Vencidos');
        setElementValue(<Text color={'danger'} display={'flex'} gap={2} alignItems={'center'} ><AiFillCloseCircle fontSize={18} /> Vencido</Text>);
        break;
      case Situacao.Cancelado:
        if (menuRef.current) {
          if (!isFilter)
            menuRef.current.style.left = '-.8rem';
          menuRef.current.style.marginTop = `-${180 + filterCorretion}px`;
        }
        canceladoRef.current?.focus()
        setCurrentRef(canceladoRef);
        if (isFilter) return setElementValue('Cancelados');
        setElementValue(<Text color={'yellow'} display={'flex'} gap={2} alignItems={'center'}  ><AiFillCloseCircle fontSize={18} /> Cancelado</Text>);
        break;
      default:
        if (menuRef.current) {
          if (!isFilter) {
            menuRef.current.style.left = '-3rem';
          }
          menuRef.current.style.marginTop = '-40px';
        }
        setCurrentRef(todosRef);
        if (isFilter) return setElementValue('Todos');
        break;
    }
  }, [internalValue])

  const onChange = (value: Situacao | null) => {
    setInternalValue(value);
    onValueChange(value);
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
        color={isFilter ? 'primary' : 'inherit'}
        fontSize={'1rem'}
        display={'flex'}
        fontWeight={500}
        h={'full'}
      >{ElementValue}</MenuButton>
      <MenuList
        fontWeight={500}
        fontSize={'1rem'}
        ref={menuRef}
      >
        {
          isFilter && (
            <MenuItem
              display={'flex'}
              gap={'6px'}
              color={'primary'}
              ref={todosRef}
              onClick={() => onChange(null)}
            >
              Todos
            </MenuItem>
          )
        }
        <MenuItem
          display={'flex'}
          gap={'6px'}
          ref={pagoRef}
          color={isFilter ? 'primary' : 'success'}
          onClick={() => onChange(Situacao.Pago)}
        >
          {
            isFilter ? 'Pagos' :
              <>
                <AiFillCheckCircle />
                Pago
              </>
          }
        </MenuItem>
        <MenuItem
          display={'flex'}
          gap={'6px'}
          color={isFilter ? 'primary' : 'soft'}
          onClick={() => onChange(Situacao.Pendente)}
          ref={pendenteRef}
        >
          {
            isFilter ? 'Pendentes' :
              <>
                <AiFillMinusCircle />
                Pendente
              </>
          }
        </MenuItem>
        <MenuItem
          display={'flex'}
          gap={'6px'}
          color={isFilter ? 'primary' : 'danger'}
          onClick={() => onChange(Situacao.Vencido)}
          ref={vencidoRef}
        >
          {
            isFilter ? 'Vencidos' :
              <>
                <AiFillCloseCircle />
                Vencido
              </>
          }
        </MenuItem>
        <MenuItem
          display={'flex'}
          gap={'6px'}
          color={isFilter ? 'primary' : 'yellow'}
          onClick={() => onChange(Situacao.Cancelado)}
          ref={canceladoRef}
        >
          {
            isFilter ? 'Cancelados' :
              <>
                <AiFillCloseCircle />
                Cancelado
              </>
          }

        </MenuItem>
      </MenuList>
    </Menu>
  )
}