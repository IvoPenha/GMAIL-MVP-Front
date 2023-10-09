import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { AnimatedLogo } from '../../shared/components/Logo/animated';

const LoginPage = () => {
  return (
    <Box display={'flex'} textAlign={'center'} gap={10} background={'primary'} width={'full'} height={'full'} justifyContent={'start'} alignItems={'center'} flexDirection={'column'}>
      {/* <Image src={'/logo.png'} alt={'Nome'} marginTop={'5%'} /> */}
      <AnimatedLogo />
      <Box display={'flex'} gap={{ lg: 3, base: 6 }} bgColor={'surface'} width={{ lg: 'container.sm', base: 'full' }} height={{ lg: 'initial', base: 'full' }} paddingX={'3rem'} paddingY={'3%'} borderRadius={8} alignItems={'center'} flexDirection={'column'} >
        <Text alignSelf={'start'} textAlign={'start'} >Gerencie seus pagamentos com facilidade e segurança. </Text>
        <Flex flexDirection={'column'} width={'full'} gap={3} >
          <Text textAlign={'start'} alignSelf={'start'} >Faça login para começar </Text>
          <LoginForm />
        </Flex>
      </Box>
      {/* <Button
        leftIcon={<PiGoogleLogoDuotone />}
        onClick={signInWithGoogle}
        colorScheme={'blue'}
        variant={'outline'}
        size={'lg'}
      >
        Entrar com Google
      </Button> */}


    </Box>
  );

}

export default LoginPage