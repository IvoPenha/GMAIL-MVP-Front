import { Box } from '@chakra-ui/react';
import { Header } from '../Header/header';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
  return (
    <Box
    >
      <Header />
      <Box
        px={{ md: "10rem", base: '1rem' }}
        paddingBottom={40}
        bg={'surface'}
        marginTop={{ md: 0, base: '-0.8rem' }}
        borderRadius={{ md: 0, base: '16px 16px 0 0 ' }}
        boxShadow={{ md: 'none', base: ' 0px -1px 3px 0px rgba(0, 0, 0, 0.12), 0px -5px 5px 0px rgba(0, 0, 0, 0.10), 0px -12px 7px 0px rgba(0, 0, 0, 0.06), 0px -22px 9px 0px rgba(0, 0, 0, 0.02), 0px -34px 10px 0px rgba(0, 0, 0, 0.00) ' }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}