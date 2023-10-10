import { TokenResponse } from '@react-oauth/google'

export interface CommonUsuarioClaims extends TokenResponse{
  id: number
  expires_in: number
  nome: string
  iat: number
  email: string
}