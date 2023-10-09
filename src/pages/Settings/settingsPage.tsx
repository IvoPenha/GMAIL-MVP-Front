import { Button } from '@chakra-ui/react'
import { useGoogleLogin } from '@react-oauth/google';
import { FaGoogle } from 'react-icons/fa'


export const SettingsPage = () => {


  const login = useGoogleLogin({
    scope: 'http://mail.google.com',
    flow: 'auth-code',
    redirect_uri: 'https://developers.google.com/oauthplayground',
    onSuccess: tokenResponse => console.log(tokenResponse),
  });


  return (
    <div>
      <Button
        bg={'primary'}
        color={'white'}
        leftIcon={<FaGoogle />}
        onClick={() => login()}
      >
        Entrar com o Google
      </Button>

    </div>
  )
}