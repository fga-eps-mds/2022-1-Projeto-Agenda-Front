import { ReactNode } from 'react';
import NextLink from 'next/link';
import { Box, Button, Text } from '@chakra-ui/react';

interface DashboardOptionsProps {
  title: string;
  isActive?: boolean;
  icon?: ReactNode;
  goTo?: string;
}

export const DashboardOptions = ({
  title,
  icon,
  isActive,
  goTo,
}: DashboardOptionsProps) => {
  return (
    <NextLink href={'/' + goTo} passHref>
      <Button
        bg={isActive ? 'primary' : 'white'}
        color={isActive ? 'white' : 'black'}
        size='sm'
        w='235px'
        h='48px'
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- its necessary since _hover NEEDS a css style object
        _hover={{ bg: 'primary', color: 'white' }}
      >
        <Box
          w='100%'
          display='flex'
          alignItems='center'
          gap='12px'
          fontSize='medium'
        >
          <Box fontSize='xx-large'>{icon}</Box>
          <Text lineHeight='initial'>{title}</Text>
        </Box>
      </Button>
    </NextLink>
  );
};
