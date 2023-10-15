import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { logos } from './images'

import './animation.css'
export const Logo = (
  { animated = false }: { animated?: boolean }
) => {
  const [isStopped, setIsStopped] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(animated);


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
      // setCurrentLogo(logos[currentFrame])
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

  // const [currentLogo, setCurrentLogo] = useState(logos[0])

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
      <svg width="5.3rem" height="'5.3rem" viewBox="0 0 206 206" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="206" height="206" rx="22" fill="white" className="svg-elem-1"></rect>
        <rect x="22" y="22" width="15" height="148" rx="7.5" fill="#369FFF" className="svg-elem-2"></rect>
        <rect x="43" y="22" width="15" height="52" rx="7.5" fill="#369FFF" className="svg-elem-3"></rect>
        <rect x="43" y="80" width="15" height="66" rx="7.5" fill="#369FFF" className="svg-elem-4"></rect>
        <rect x="64" y="22" width="15" height="124" rx="7.5" fill="#369FFF" className="svg-elem-5"></rect>
        <rect x="85" y="22" width="15" height="124" rx="7.5" fill="#369FFF" className="svg-elem-6"></rect>
        <rect x="106" y="22" width="15" height="124" rx="7.5" fill="#369FFF" className="svg-elem-7"></rect>
        <rect x="127" y="22" width="15" height="124" rx="7.5" fill="#369FFF" className="svg-elem-8"></rect>
        <rect x="148" y="22" width="15" height="38" rx="7.5" fill="#369FFF" className="svg-elem-9"></rect>
        <rect x="148" y="108" width="15" height="38" rx="7.5" fill="#369FFF" className="svg-elem-10"></rect>
        <rect x="169" y="22" width="15" height="148" rx="7.5" fill="#369FFF" className="svg-elem-11"></rect>
      </svg>

      <Text
        fontSize={'3.8rem'}
        color={'surface'}
        fontFamily={'logo'}
      > docpost </Text>
    </Flex>
  )
}

export const AnimatedLogo = () => <Logo animated />