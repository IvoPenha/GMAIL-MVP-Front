import { Box, SkeletonText } from '@chakra-ui/react';
import React from 'react';

interface EstatisticaCardProps {
  title: string;
  margin?: 'left' | 'right' | 'none';
}

export const SkeletonEstatisticaCard: React.FC<EstatisticaCardProps> = ({
  title,
  margin
}) => {
  return (
    <Box
      width={'full'}
      className='estatisticaCard'
      padding={margin === 'left' ? '0 .5rem 0 .5rem' : margin === 'right' ? '0 1rem 0 0' : '0 .5rem 0 0'}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        gap={'.75rem'}
        bg={'estatisticaCard'}
        fontFamily={'manrope'}
        paddingX={{ lg: '25px', base: '14px' }}
        height={'120px'}
        borderRadius={'10px'}
        width={'100%'}
        maxWidth={{ lg: '20rem', base: 'none' }}
      >
        <Box fontSize={{ md: '1rem', base: '.7rem' }} fontWeight={500} color="subtitle">
          {title}
        </Box>
        <Box fontSize="4xl" display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          color={'highlight'}
          fontWeight="bold">
          <Box
            bg={'primary'}
            height={'2rem'}
            borderRadius={20}
            w={'.3rem'}
          ></Box>
          <Box
            display={'flex'}
            justifyContent={'center'}
            gap={'.1rem'}
          >

            <SkeletonText
              mt="4"
              noOfLines={1}
              spacing="4"
              w="1rem"
              height={'2rem'}
            />
            <SkeletonText
              mt="4"
              noOfLines={1}
              spacing="4"
              w="1rem"
              height={'2rem'}
            />
          </Box>
        </Box>
      </Box>
    </Box>

  );
}