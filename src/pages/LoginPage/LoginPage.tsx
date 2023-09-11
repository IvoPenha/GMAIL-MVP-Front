import { Button } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { logar } from '../../services/login';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

//   const [token, setToken] = useState<any>({})
  const navigate = useNavigate()
  const googleLogin = useGoogleLogin({
    scope: 'https://mail.google.com',    
  onSuccess: async ({ code }) => {
    const response = await logar(code)
    if(response.token){
      localStorage.setItem('token', response.token)
      navigate('/')
    }
  },
  flow: 'auth-code',
})

  // useEffect(() => {
  //   console.log(token)
  // }, [token])

  return (
    <div>
      <Button onClick={googleLogin} >Login Com Google</Button>
    </div>
  );

}

export default LoginPage