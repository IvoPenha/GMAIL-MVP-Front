import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const Logo = (
  { animated = false }: { animated?: boolean }
) => {
  const [isStopped, setIsStopped] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  function handleAnimationComplete() {
    setIsStopped(true);
  }
  function changeFrame() {
    if (isStopped) return
    if (currentFrame < 8) {
      setCurrentFrame(currentFrame + 1)
    }
    if (currentFrame === 8) {
      handleAnimationComplete()
    }
  }
  useEffect(() => {
    if (isStopped) return
    setTimeout(() => {
      changeFrame()
    }, 50)
  }, [currentFrame])
  return (
    <Flex
      marginTop={'5%'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Image
        src={animated ? `/logoframe${currentFrame}.png` : '/logoframe8.png'}
        alt={'logo'}
        loading="eager"
        width={'5.3rem'}
      />
      <Text
        fontSize={'3.8rem'}
        color={'surface'}
        fontFamily={'logo'}
      > docpost </Text>
    </Flex>
  )
}

export const AnimatedLogo = () => <Logo animated />