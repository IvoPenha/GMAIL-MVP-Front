import { Box } from '@chakra-ui/react'
import { CardSkeleton } from './Card/CardSkeleton'

export const CardListSkeleton = () => {
  return (
    <Box
      display={"grid"}
      rowGap={8}
      gridTemplateColumns={{ xl: "repeat(3, 1fr)", lg: "repeat(2,1fr)", base: "repeat(1, 1fr)" }}
      columnGap={6}
      width={'full'}
      paddingY={2}
    >
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </Box>
  )
}