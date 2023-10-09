import { Box } from '@chakra-ui/react';
import { Header } from '../Header/header';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
  return (
    <Box
      bgColor={'white'}
    >
      <Header />
      <Box
        px={{ md: "10rem", base: '1rem' }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}