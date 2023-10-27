import { Box, Button, Center, Icon, Text } from '@chakra-ui/react'
import { useGoogleLogin } from '@react-oauth/google';
import { Accordeon } from './components';
import { FcGoogle } from 'react-icons/fc';
import { BsMicrosoft } from 'react-icons/bs';


export const SettingsPage = () => {


  const login = useGoogleLogin({
    scope: 'http://mail.google.com',
    flow: 'auth-code',
    redirect_uri: 'https://developers.google.com/oauthplayground',
    onSuccess: tokenResponse => console.log(tokenResponse),
  });


  return (
    <Box
      paddingY={4}
    >
      <Text
        fontWeight={'bold'}
        fontSize={'lg'}
        mb={4}
      >E-Mails conectados</Text>
      <Accordeon/>

      {/* <Button
        bg={'primary'}
        color={'white'}
        leftIcon={<FaGoogle />}
        onClick={() => login()}
      >
        Entrar com o Google
      </Button> */}
      <Center pt={8} flexDir={'column'} gap={6} alignItems={{md: 'start', base: 'center'}}>
      <Button w={'full'} maxW={'md'} variant={'outline'} leftIcon={<Icon 
        as={FcGoogle}
        background={'white'}
        borderRadius={'full'}
      />}
        onClick={() => login()}
        background={'primary'}
        color={'white'}
        _hover={{
          background: 'primary',
          opacity: 0.8                 
        }}
        _focus={{
          background: 'primary',                 
          opacity: 0.9
        }}
        >
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>

      <Button w={'full'} maxW={'md'} variant={'outline'} leftIcon={<BsMicrosoft />}
        onClick={() => login()}>
        <Center>
          <Text>Sign in with Microsoft</Text>
        </Center>
      </Button>
    </Center>

    </Box>
  )
}