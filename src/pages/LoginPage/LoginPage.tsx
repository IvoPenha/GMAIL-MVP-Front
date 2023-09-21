import { Box, Button } from '@chakra-ui/react';
import { PiGoogleLogoDuotone } from 'react-icons/pi';
import { auth, googleProvider } from '../../firebase-settings'
import { signInWithPopup, UserCredential  } from 'firebase/auth'
import { logar } from '../../services/login';
import { Cache, Cryptography } from '../../core';
import { useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { saveAccessToken} = useAuth()
  const navigate = useNavigate()
  const signInWithGoogle = async () => {
    try {
    const response = await signInWithPopup(auth ,googleProvider) as any
    if(response.user){
      const apiLogarResponse = await logar(response._tokenResponse.oauthAccessToken)
      apiLogarResponse.expires_in = new Date().getTime() + 3600000 
      const userToken = Cryptography.encodeToken(apiLogarResponse)
      saveAccessToken(userToken)
      navigate('/')
      Cache.set({
        key: 'token',
        value: apiLogarResponse.token
      })
      console.log(response.user.stsTokenManager.refreshToken)
    }
    } catch (err){
      console.error(err);
    }
  };

  return (
    <Box display={'flex'} textAlign={'center'} background={'peru'} gap={32} width={'container.xl'} height={'container.md'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
      <h1>DocPost Prova de conceito</h1>
      <Button onClick={() => signInWithGoogle()} > <PiGoogleLogoDuotone/> Login Com Google</Button>
      
    </Box>
  );

}

export default LoginPage