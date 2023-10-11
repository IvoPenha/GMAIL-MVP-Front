import { Box } from '@chakra-ui/react';
import './DotLoading.css'
export const DotLoading: React.FC<{ variant?: 'primary' | 'error' | 'filled' }> = ({ variant }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"full"}
    >
      <div className={variant === 'primary' ? 'dot-typing-primary' : variant === 'error' ? 'dot-typing-error' : 'dot-typing-filled'}></div>
    </Box>
  );
}