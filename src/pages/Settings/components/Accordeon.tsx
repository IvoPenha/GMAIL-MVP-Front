import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import React from 'react';

export const Accordeon : React.FC = () => {
  return (
    
    <Accordion allowMultiple>
    <AccordionItem>
      <h2>
        <AccordionButton
          color={'gray.500'}
          fontWeight={'bold'}
        >
          <Box as="span" flex='1' textAlign='left'>
            Google
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
       ivoxps@gmail.com
      </AccordionPanel>
    </AccordionItem>
  
    <AccordionItem>
      <h2>
        <AccordionButton
          color={'gray.500'}
          fontWeight={'bold'}>
          <Box as="span" flex='1' textAlign='left'>
            Microsoft
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
       teste@outlook.com
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
  )
}