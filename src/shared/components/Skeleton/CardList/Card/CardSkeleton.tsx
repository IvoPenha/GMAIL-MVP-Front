import { Box, Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

export const CardSkeleton = () => {
  return (
    <Box
      width={'full'}
      bg="white"
      boxShadow={"lg"}
      dropShadow={'2xl'}
      rounded="lg"
      display={"flex"}
      height={"fit-content"}
      alignItems={"center"}
      paddingX={".75rem"}
      paddingY={"1.5rem"}
      gap={".875rem"}
    >
      <SkeletonCircle size='12' w={'14'} />
      <Flex
        width={'full'}
        justifyContent={"space-between"}
      >
        <Box
          maxWidth={"12rem"}
          display={"flex"}
          width={'full'}
          flexDirection={"column"}
          gap={".5rem"}
        >
          <SkeletonText noOfLines={1} w={'full'} spacing='4' />
          <SkeletonText noOfLines={1} w={'60%'} spacing='4' />
          <SkeletonText noOfLines={1} w={'40%'} spacing='4' />
        </Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          width={'20%'}
          gap={2}
        >
          <SkeletonCircle size={'4'} w={'6'} />
          <SkeletonText noOfLines={1} w={'full'} spacing={'4'} />
        </Box>
      </Flex>
    </Box>
  )
}