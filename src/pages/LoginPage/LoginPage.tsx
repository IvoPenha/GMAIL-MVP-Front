import { Box, Button } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { logar } from '../../services/login';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { Cryptography, Cache } from '../../core';
import { PiGoogleLogoDuotone } from 'react-icons/pi';

const LoginPage = () => {

  const { saveAccessToken} = useAuth()
//   const [token, setToken] = useState<any>({})
  const navigate = useNavigate()
  const googleLogin = useGoogleLogin({
    scope: 'https://mail.google.com',    
  onSuccess: async (user) => {
    const response = await logar(user.access_token)
    if(response.token){ 
      Cache.set({
        key: 'token',
        value: response.token
      })
    }
    if(user.access_token){
      user.expires_in = new Date().getTime() + 3600 
      const userToken = Cryptography.encodeToken(user)
      saveAccessToken(userToken)
      navigate('/')
    }
  },
  flow: 'implicit',
})

  // useEffect(() => {
  //   console.log(token)
  // }, [token])

  return (
    <Box display={'flex'} textAlign={'center'} background={'peru'} gap={32} width={'container.xl'} height={'container.md'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
      <h1>DocPost Prova de conceito</h1>
      <Button onClick={() => googleLogin()} > <PiGoogleLogoDuotone/> Login Com Google</Button>
    </Box>
  );

}

export default LoginPage