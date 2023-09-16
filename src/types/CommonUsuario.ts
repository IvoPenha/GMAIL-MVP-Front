import { TokenResponse } from '@react-oauth/google'

export interface CommonUsuarioClaims extends TokenResponse{
  exp: number
  email: string
}