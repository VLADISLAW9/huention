import { Box, Button, Center, Flex, Stack, Text, Title } from '@mantine/core';

import { ROUTES } from '@/utils/constants';

import { Logotype } from './(components)';

const IndexPage = () => (
  <>
    <Flex justify='space-between' px={200} py={50}>
      <Flex gap='xs'>
        <Logotype />
        <Text>Huention</Text>
      </Flex>
      <Flex gap='xs'>
        <Button href={ROUTES.SIGN_IN} component='a'>
          Войти
        </Button>
        <Button href={ROUTES.SIGN_UP} variant='white' component='a'>
          Зарегистрироваться
        </Button>
      </Flex>
    </Flex>
    <Center mt={200}>
      <Stack align='center' gap='xl'>
        <Text
          fw={700}
          gradient={{ from: 'rgba(255, 255, 255, 1)', to: 'rgba(112, 112, 112, 1)', deg: 90 }}
          size='52px'
          ta='center'
          variant='gradient'
        >
          Организуй, планируй, управляй <br /> знаниями
        </Text>
        <Button
          href={ROUTES.SIGN_UP}
          gradient={{ from: 'rgba(163, 163, 163, 1)', to: 'rgba(64, 61, 61, 1)', deg: 90 }}
          size='xl'
          variant='gradient'
          w={400}
          component='a'
        >
          Начать бесплатно
        </Button>
      </Stack>
    </Center>
  </>
);

export default IndexPage;
