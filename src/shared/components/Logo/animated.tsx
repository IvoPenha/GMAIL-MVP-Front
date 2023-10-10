import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { logos } from './images'

export const Logo = (
  { animated = false }: { animated?: boolean }
) => {
  const [isStopped, setIsStopped] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);



  function handleAnimationComplete() {
    setIsStopped(true);
  }
  useEffect(() => {
    if (logos.length > 7)
      setIsLoaded(true)
  }, [])
  function changeFrame() {
    if (isStopped) return
    if (currentFrame < 8) {
      setCurrentFrame(currentFrame + 1)
      setCurrentLogo(logos[currentFrame])
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

  const [currentLogo, setCurrentLogo] = useState(logos[0])

  return (
    <Flex
      marginTop={'5%'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Box
        width={'5.3rem'}
        height={'5.3rem'}
        bg={'surface'}
        borderRadius={'8%'}
        position={'absolute'}
        zIndex={!isLoaded ? 1 : -1}
      />
      <Image
        src={animated ? currentLogo : logos[8]}
        alt={'eager'}
        width={'5.3rem'}
        height={'5.3rem'}
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