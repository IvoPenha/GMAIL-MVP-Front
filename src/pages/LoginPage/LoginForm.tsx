import GenericForm from '../../shared/components/Form/Form';
import * as yup from 'yup';
import { defaultsValidations } from '../../shared/validationSchema';
import { BsPerson } from 'react-icons/bs';
import { MdLockOutline } from 'react-icons/md';
import { signIn } from '../../services';
import { useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {

  const { saveAccessToken } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    try {
      const response = await signIn(data)
      if (response.response.accessToken) {
        saveAccessToken(response.response.accessToken)
        navigate('/')
      }
    }
    catch (err) {
      window.alert(err)
    }

  };

  const values = {
    email: {
      inputType: 'text',
      label: 'E-mail',
      key: 'email',
      icon: BsPerson
    },
    senha: {
      inputType: 'password',
      label: 'Senha',
      key: 'senha',
      icon: MdLockOutline
    },
  };

  const validationSchema = yup.object().shape({
    email: defaultsValidations.email,
    senha: defaultsValidations.senha,
  });

  // Renderize o GenericForm com os valores padrão e a função de submissão específica
  return (
    <GenericForm values={values} onSubmit={onSubmit} validationSchema={validationSchema} />
  );
}